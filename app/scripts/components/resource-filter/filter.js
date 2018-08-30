import React from 'react'
import Dropdown from './dropdown'
import ResourceItem from './item'
import scrollTo from '../scroll-to'
import { safeFetch } from '../../utilities'

class Filter extends React.Component {
  static propTypes = {
    source: React.PropTypes.string,
  }

  static getExcerpt(excerpt) {
    const div = document.createElement('div')
    div.innerHTML = excerpt
    let text = div.textContent || div.innerText || ''
    if (text.length > 90) {
      text = `${text.trim().replace(/^(.{90}[^\s]*).*/, '$1')}...`
    }
    return text
  }

  static transform(result, item) {
    const { fullUrl, id, title, tags, excerpt, systemDataId, assetUrl } = item
    const excerptText = Filter.getExcerpt(excerpt)
    if (tags && tags.indexOf('browse-all') < 0) { // Ignore 'Browse All Resources' item
      result.push({
        fullUrl,
        title,
        tags,
        excerpt: excerptText,
        key: id,
        systemDataId,
        assetUrl,
      })
    }
    return result
  }

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      filtered: [],
      itemLimit: 6,
      batchSize: 3,
      disabled: true,
      filterProps: [
        {
          key: 'type',
          activeCss: 'is-active-type',
          label: 'Show Me',
          options: [
            {
              displayName: 'All resource types',
              showAll: 'true',
            },
          ],
          activeOption: {
            displayName: 'All resource types',
            showAll: 'true',
          },
          onSelection: this.handleSelection.bind(this),
        },
        {
          key: 'topic',
          activeCss: 'is-active-topic',
          label: 'About',
          options: [
            {
              displayName: 'All topics',
              showAll: 'true',
            },
          ],
          activeOption: {
            displayName: 'All topics',
            showAll: 'true',
          },
          onSelection: this.handleSelection.bind(this),
        },
        {
          key: 'audience',
          activeCss: 'is-active-audience',
          label: 'For',
          options: [
            {
              displayName: 'All audiences',
              showAll: 'true',
            },
          ],
          activeOption: {
            displayName: 'All audiences',
            showAll: 'true',
          },
          onSelection: this.handleSelection.bind(this),
        },
      ],
    }
    this.showNextBatch = this.showNextBatch.bind(this)
    this.init()
  }

  handleSelection(key, option) {
    const newProps = { filterProps: [] }
    const prop = this.state.filterProps.find(x => x.key === key)
    prop.activeOption = option
    newProps.filterProps.push(prop)
    this.setState({ newProps })
    this.updateResources(key, option)
  }

  loadNextPage = async (initial = false) => {
    const { nextPage } = this.state
    if (!initial || !nextPage) {
      return
    }
    this.setState({ disabled: true })
    const { items, pagination } = await safeFetch(`${nextPage}&format=json`)
    this.populate(items, pagination)
  }

  populate(items, pagination) {
    const hasMoreData = pagination && pagination.nextPage
    const filterProps = this.state.filterProps.map(prop => this.populateFilter(prop, items))
    this.setState((nextState) => ({
      filterProps,
      disabled: this.state.itemLimit >= items.length,
      items: [...nextState.items, ...items.reduce(Filter.transform, [])],
      filtered: [...nextState.items, ...items.reduce(Filter.transform, [])],
      nextPage: hasMoreData && pagination.nextPageUrl,
    }))
    filterProps.forEach(filter => {
      this.updateResources(filter.key, filter.activeOption)
    })
  }

  populateFilter(prop, items) {
    const found = []
    const category = `${prop.key[0].toUpperCase() + prop.key.slice(1)}: `
    prop.options.forEach(option => found.push(option.attrValue))
    items.forEach(item => {
      item.tags.forEach(tag => {
        if (tag && tag.indexOf(category) > -1 && found.indexOf(tag) < 0) {
          found.push(tag)
          prop.options.push({
            displayName: tag.replace(category, ''),
            attrValue: tag,
          })
        }
      })
    })
    prop.options.sort((item1, item2) => (item1.displayName > item2.displayName))
    return prop
  }

  scrollTo(e) {
    const { target } = e
    if (target && target.nodeName === 'A') {
      e.preventDefault()
      scrollTo.to(document.querySelector(target.getAttribute('href')))
    }
  }

  showNextBatch() {
    this.setState({
      itemLimit: this.state.itemLimit + this.state.batchSize,
      disabled: this.state.itemLimit + this.state.batchSize >= this.state.filtered.length,
    })
  }

  updateResources(key, option) {
    const items = this.state.items
    const filtered = []
    if (typeof option === 'undefined' || option.showAll) {
      items.forEach(item => {
        if (!item.activeFilters) {
          item.activeFilters = [key]
        } else if (item.activeFilters.indexOf(key) < 0) {
          item.activeFilters.push(key)
        }
      })
    } else {
      items.forEach(item => {
        let matched = false
        const index = item.activeFilters.indexOf(key)
        item.tags.forEach(tag => {
          if (tag.indexOf(option.attrValue) > -1) {
            matched = true
            if (index < 0) {
              item.activeFilters.push(key)
            }
          }
        })
        if (!matched && index > -1) {
          item.activeFilters.splice(index, 1)
        }
      })
    }
    items.forEach((item) => {
      if (item.activeFilters.length === this.state.filterProps.length) {
        filtered.push(item)
      }
    })
    this.setState({ items, filtered, disabled: !(filtered.length > this.state.itemLimit) })
  }

  async init() {
    const { source } = this.props
    const url = `/${source}?format=json`
    const { items, pagination } = await safeFetch(url)
    this.populate(items, pagination)
  }

  render() {
    const { itemLimit, disabled, filterProps, filtered } = this.state
    filterProps.forEach(filter => { filter.id = filter.key })

    return (
      <div>
        <div className="p-FiltersList Grid">
          {filterProps.map(props => <Dropdown {...props} />)}
        </div>
        <div className="p-ResourcesList Columns Columns--small">
          {filtered.slice(0, itemLimit).map(props => <ResourceItem {...props} />)}
        </div>
        <div className="p-FiltersNav u-textCenter">
          <a
            className={`CtaButton CtaButton--white ${disabled ? 'is-disabled' : ''}`}
            onClick={this.showNextBatch}
          >
            Load More
            <span className="CtaButton-arrow DirectionalArrow DirectionalArrow--down" />
          </a>
          <a
            className="CtaButton CtaButton--white"
            href="#filter"
            onClick={this.scrollTo}
          >
            Filters
            <span className="CtaButton-arrow DirectionalArrow DirectionalArrow--up" />
          </a>
        </div>
      </div>
    )
  }
}

export default Filter
