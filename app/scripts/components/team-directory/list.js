import React from 'react'
import DirectoryItem from './item'
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
      const tagValues = personData.tags.split(',').map(tag => tag.trim())
      if (!this.props.filterValue || this.props.filterValue === 'all' || tagValues.includes(this.props.filterValue)) {
        return (
          <DirectoryItem
            url={personData.url}
            key={index}
            name={`${personData.firstname} ${personData.lastname}`}
          />
        )
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
