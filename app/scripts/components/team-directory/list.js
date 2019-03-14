import React from 'react'
import DirectoryItem from './item'
import DirectoryItemLink from './item-link'
import { getSpreadsheetData } from '../../utilities'

class DirectoryList extends React.Component {
  static propTypes = {
    search: React.PropTypes.string,
    filterValue: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentWillMount() {
    getSpreadsheetData((googleSpreadsheet) => {
      const items = Object.keys(googleSpreadsheet.data)
        .reduce((accumulator, currentKey) => {
          accumulator.push(googleSpreadsheet.data[currentKey])
          return accumulator
        }, [])
        .sort((a, b) => {
          if (a.lastname.trim() > b.lastname.trim()) {
            return 1
          }
          return -1
        })
      this.setState({ items })
    })
  }

  /**
  * render a list of team members
  **/
  renderList() {
    return this.state.items.map((personData, index) => {
      // personData.tags = "thing1, thing2";
      if(typeof(personData.tags) === 'undefined') {
        personData.tags = 'timeCapsule';
      }
      const tagValues = personData.tags.split(',').map(tag => tag.trim())
      if(personData.tags.indexOf('hidden') > -1) { return null } // sorry
      if (!this.props.filterValue || this.props.filterValue === 'all' || tagValues.includes(this.props.filterValue)) {
        if(personData.tags.indexOf('timeCapsule') > -1) {
          return (
            <DirectoryItem
              url={personData.url}
              key={index}
              name={`${personData.firstname} ${personData.lastname}`}
              tags={personData.tags}
            />
          )
        } else {
          return (
            <DirectoryItemLink
              url={personData.url}
              key={index}
              name={`${personData.firstname} ${personData.lastname}`}
              tags={personData.tags}
            />
          )
        }
       }
      return null
    })
  }

  render() {
    return (
      <ul className="Directory-list-content List">
        {this.renderList()}
      </ul>
    )
  }
}

export default DirectoryList
