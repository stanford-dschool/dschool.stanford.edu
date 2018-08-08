import React from 'react'
import classNames from 'classnames'
import Checkbox from '../checkbox'

class SearchFilters extends React.Component {
  static propTypes = {
    openFilters: React.PropTypes.bool,
    facets: React.PropTypes.object,
    filters: React.PropTypes.object,
    onClickHandle: React.PropTypes.func,
  }

  selectFilter = (event, filterName, optionName) => {
    const input = this.refs[optionName]
    const { filters } = this.props
    if (filters[filterName]) {
      const filterSet = new Set(filters[filterName])
      if (!input.isChecked()) { // not checked yet but will be
        filterSet.add(optionName)
      } else {
        filterSet.delete(optionName)
      }
      // remove key if filters is empty
      if (filterSet.size === 0) {
        delete filters[filterName]
      } else {
        filters[filterName] = Array.from(filterSet)
      }
    } else if (!input.isChecked()) {
      filters[filterName] = [optionName]
    }

    this.props.onClickHandle(filters)
  }

  toggleFilter = (event, filterName) => {
    const node = this.refs[filterName]
    event.currentTarget.classList.toggle('is-active')
    node.classList.toggle('is-active')
  }

  renderOption(filterName, optionName, optionCount, index) {
    let isChecked = false
    if (this.props.filters[filterName]) {
      if (this.props.filters[filterName].indexOf(optionName) > -1) {
        isChecked = true
      }
    }

    const nameSplitted = optionName.trim().split('-')
    if (optionName.indexOf('search-program') === 0) {
      nameSplitted.splice(0, 2)
    }
    const name = nameSplitted.join(' ')

    if (name !== '') {
      return (<div key={index} className="Search-option">
        <label
          onClick={(event) => this.selectFilter(event, filterName, optionName)}
          className="Search-option-label t-filter"
          htmlFor="filter"
        >
          <Checkbox checked={isChecked} ref={optionName} name="filter" type="checkbox" className="Search-input--checkbox" />
          <span className="Search-option-title">{name} ({optionCount})</span>
          <div className="Search-checkbox" />
        </label>
      </div>)
    }

    return null
  }

  renderFilter(filterName, index) {
    const name = filterName.split('_').join(' ')
    const optionsObj = this.props.facets[filterName]
    const isActive = this.props.openFilters && this.props.filters[filterName] ? this.props.filters[filterName].length > 0 : false

    return (
      <div className={classNames('Search-filter', Object.keys(optionsObj).length < 1 && 'is-disabled')} key={index}>
        <button onClick={(event) => this.toggleFilter(event, filterName)} className={classNames('Search-filter-name', 't-filterName', isActive && 'is-active')}>By {name}</button>
        <div className={classNames('Search-filter-list', isActive && 'is-active')} ref={filterName}>
          { Object.keys(optionsObj).sort().map((optionName, i) => this.renderOption(filterName, optionName, optionsObj[optionName], i))}
        </div>
      </div>
    )
  }

  render() {
    const { facets } = this.props
    return (
      <div className="Search-filters u-largeShadow u-md-size5">
        <div className="Search-filter-title t-tag">Filters</div>
        { Object.keys(facets).sort().map((filterName, index) => this.renderFilter(filterName, index)) }
      </div>
    )
  }
}

export default SearchFilters
