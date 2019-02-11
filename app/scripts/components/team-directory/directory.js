import React from 'react'
import classNames from 'classnames'
import DirectoryList from './list'

class Directory extends React.Component {
  static filterOptions = {
    current: 'Currently Active',
    timeCapsule: 'Time Capsule',
    all: 'All',
  }

  constructor(props) {
    super(props)
    this.state = {
      filterValue: 'current',
      filterActive: false,
      searchValue: '',
    }

    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
  }

  selectFilter(event, filterValue) {
    this.setState({ filterValue, filterActive: false })
  }

  hide() {
    this.setState({
      filterActive: false,
    })

    document.removeEventListener('click', this.hide)
  }

  show() {
    this.setState({
      filterActive: true,
    })

    document.addEventListener('click', this.hide)
  }

  renderFilterOptions() {
    return Object.keys(Directory.filterOptions).map((key, index) =>
      (
        <li
          tabIndex={this.state.filterActive ? '0' : '-1'}
          className={classNames(
            'FilterOption-dropdownItem',
            this.state.filterValue === key && 'is-active'
          )}
          key={index}
          onClick={(e) => this.selectFilter(e, key)}
          onKeyPress={(e) => this.selectFilter(e, key)}
        >{Directory.filterOptions[key]}</li>
      )
    )
  }

  render() {
    return (
      <div className="Directory-content u-offset1 u-size15">
        <div className="Directory-filter u-size13 u-md-size8">
          <div className={this.state.filterActive ? 'FilterOption is-active' : 'FilterOption'}>
            <div className="FilterOption-label t-tag">Show Me</div>
            <div
              tabIndex="0"
              className="FilterOption-select t-monospaced"
              onKeyPress={this.state.active ? this.hide : this.show}
              onClick={this.state.active ? this.hide : this.show}
            >
              <span className="FilterOption-default">{Directory.filterOptions[this.state.filterValue]}</span>
              <ul className="FilterOption-dropdown">
                {this.renderFilterOptions()}
              </ul>
            </div>
          </div>
        </div>
        <DirectoryList search="search" filterValue={this.state.filterValue} />
      </div>
    )
  }
}

export default Directory
