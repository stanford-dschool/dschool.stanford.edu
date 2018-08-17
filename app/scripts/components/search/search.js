import axios from 'axios'
import classNames from 'classnames'
import React from 'react'
import SearchAutocomplete from './search-autocomplete'
import SearchFeatured from './search-featured'
import SearchFilters from './search-filters'
import SearchList from './search-list'
import SearchResult from './search-result'
import { extractContent } from '../../utilities'

class Search extends React.Component {
  static contentTypeFilters = ['articles', 'classes', 'events', 'field-notes', 'program-collections', 'programs', 'resource-collections', 'resources']
  static propTypes = {
    root: React.PropTypes.object,
  }
  static engineKey = 'zt1wDQxYiyfnpMW2Gz5P'
  static originalState = {
    autocomplete: [],
    currentAutocompleteInx: -1,
    filters: { }, // obj w set as a value
    facets: {
      content_type: { },
      program_type: { },
    },
    recordCount: 0,
    query: '',
    currentPage: 1,
    pageCount: 0,
    showResult: false,
  }

  constructor(props) {
    super(props)
    this.state = Search.originalState
  }

  componentDidMount() {
    document.addEventListener('filter', this.onFilter)
  }

  componentWillUnmount() {
    document.removeEventListener('filter', this.onFilter)
  }

  onFilter = event => this.search(event.detail.query, 1, this.state.filters, true, true)

  closeOverlay = (event) => {
    event.preventDefault()
    this.props.root.classList.remove('is-expanded')
    document.documentElement.classList.remove('u-noScroll')
    document.documentElement.classList.remove('modal-is-open')
  }

  selectAutocomplete = queryHtml => this.search(extractContent(queryHtml), 1, this.state.filters, true)

  autocomplete = query => {
    const url = `https://search-api.swiftype.com/api/v1/public/engines/suggest.json?q=${query}&engine_key=${Search.engineKey}`
    const params = {
      fetch_fields: {
        page: ['content_type', 'image', 'sections', 'theme_type', 'program_type', 'url', 'description', 'title'],
      },
      highlight_fields: {
        page: {
          title: {
            size: 10,
          },
          sections: {
            size: 15,
          },
        },
      },
      spelling: 'retry',
      page: 1,
      per_page: 4,
    }

    axios.post(url, params)
      .then(res => {
        const autocomplete = [...new Set(res.data.records.page.map(item => {
          if (item.highlight.sections) {
            return item.highlight.sections
          }
          return item.highlight.title
        }))]

        this.setState({ autocomplete })
      })
  }

  isFeatured(results) {
    return results[0]._score === 1
  }

  search = (query, page = 1, filters, updateFacets = true, openFilters = false) => {
    const url = `https://search-api.swiftype.com/api/v1/public/engines/search.json?q=${query}&engine_key=${Search.engineKey}`
    const params = {
      facets: {
        page: ['content_type', 'program_type'],
      },
      fetch_fields: {
        page: ['content_type', 'image', 'sections', 'theme_type', 'program_type', 'url', 'description', 'title'],
      },
      filters: {
        page: filters,
      },
      highlight_fields: {
        page: {
          title: {
            size: 45,
            fallback: true
          },
          body: {
            size: 120,
            fallback: true
          },
          sections: {
            size: 45,
            fallback: true
          },
        },
      },
      spelling: 'retry',
      page,
      per_page: 20,
    }
    // set value query
    this.refs.searchInput.value = query

    if (query.length === 0 && Object.keys(this.state.filters).length === 0) {
      this.setState(Search.originalState)
    } else {
      axios.post(url, params)
        .then(res => {
          console.log(res)
          if (res.data.record_count === 0 && Object.entries(this.state.filters).length > 0 && query.length > 0) {
            this.search(query, 1, {}, true)
          } else {
            const results = res.data.records.page
            const newState = {
              autocomplete: [],
              currentAutocompleteInx: -1,
              recordCount: res.data.info.page.total_result_count,
              query,
              filters,
              openFilters,
              currentPage: page,
              pageCount: res.data.info.page.num_pages,
              showResult: true,
            }

            if (res.data.info.page.facets && updateFacets) {
              const facets = res.data.info.page.facets
              const selectedFacets = {
                program_type: facets.program_type,
                content_type: { },
              }

              // create custom filters
              Search.contentTypeFilters.forEach(option => {
                if (facets.content_type[option]) {
                  selectedFacets.content_type[option] = facets.content_type[option]
                }
              })
              newState.facets = selectedFacets
            }

            if (newState.recordCount > 5 && page === 1 && this.isFeatured(results)) {
              newState.mainCard = newState.recordCount > 0 ? results[0] : null
              newState.gridCards = newState.recordCount > 1 ? results.slice(1, Math.min(newState.recordCount, 5)) : []
              newState.restResults = newState.recordCount > 5 ? results.slice(5, newState.recordCount) : []
            } else {
              if (page === 1) {
                newState.mainCard = null
                newState.gridCards = null
              }
              newState.restResults = results
            }

            this.setState(newState)
          }
        })
    }
  }

  debouncedInput = (keyCode, query) => {
    const { autocomplete, currentAutocompleteInx, filters } = this.state
    // if up
    if (autocomplete.length > 0 && keyCode === 38 && currentAutocompleteInx >= 0) {
      this.setState({ currentAutocompleteInx: currentAutocompleteInx - 1 })
    } else if (autocomplete.length > 0 && keyCode === 40 && currentAutocompleteInx < 3) {
      // if down
      this.setState({ currentAutocompleteInx: currentAutocompleteInx + 1 })
    } else if (keyCode === 13) {
      // if enter
      if (currentAutocompleteInx > -1) {
        this.search(extractContent(autocomplete[currentAutocompleteInx]), 1, filters, true)
      } else {
        this.search(query, 1, filters, true)
      }
    } else {
      if (query.trim().length >= 3) {
        // only start search for autocomplete when query's length is more than 3 chars
        this.autocomplete(query)
      } else if (autocomplete.length > 0) {
        this.setState({ autocomplete: [] })
      }
    }
  }

  selectPage = pageNumber => this.search(this.state.query, pageNumber, this.state.filters, false)

  selectFilter = filters => this.search(this.state.query, 1, filters, Object.keys(filters).length === 0)

  renderErrorMessage = () => {
    const { filters, query, recordCount } = this.state
    const hasSelectedFilters = Object.keys(filters).length > 0
    const hasSearchValue = query.trim().length > 0

    if (recordCount === 0) {
      if (hasSearchValue) {
        return (
          <div className="Container Search-result--none"><div className="p-CollectionTitle t-title Search-list-title">Your search query did not match any documents.</div></div>
        )
      } else if (hasSelectedFilters) {
        return (
          <div className="Container Search-result--none"><div className="p-CollectionTitle t-title Search-list-title">Your prefiltered search did not match any documents.</div></div>
        )
      }
    }
    return null
  }

  renderResults = () => {
    const { openFilters, currentPage, facets, filters, recordCount, pageCount, restResults, query, mainCard, gridCards } = this.state
    const expandResult = Object.keys(filters).length > 0 || query.trim().length > 0 || recordCount > 0

    return (
      <SearchResult expand={expandResult}>
        <div className="Container">
          <span className={classNames(query.trim().length < 1 && 'u-hide', 't-tag', 'Search-count--results-for')}>showing results for: "{query}"</span>
          <span className="Search-count--detail t-tag ">{recordCount} results</span>
        </div>
        { this.renderErrorMessage() }
        { mainCard && recordCount > 0 ?
          <SearchFeatured recordCount={recordCount} query={query} mainCard={mainCard} gridCards={gridCards} />
          : null
        }
        <div className="Search-rest Container">
          { recordCount > 0 ? <SearchFilters openFilters={openFilters} facets={facets} filters={filters} onClickHandle={this.selectFilter} /> : null }
          { restResults ?
            (<SearchList currentPage={currentPage} pageCount={pageCount} queryHandle={this.selectPage} results={restResults} />)
            : null
          }
        </div>
      </SearchResult>
    )
  }

  render() {
    const { autocomplete, currentAutocompleteInx, showResult, query, filters } = this.state
    const hasSearchValue = query.trim().length > 0 || Object.keys(filters).length > 0
    const showAutocomplete = autocomplete.length > 0

    return (
      <div className="Search-container">
        <div className={classNames('Search-prompt', showResult && 'show-result', showResult && showAutocomplete && 'show-autocomplete')}>
          <div className="Search-header u-offset1 u-size14">
            <a className="Search-logo u-hideText" href="/">
              <h1>dschool</h1>
            </a>
            <a onClick={this.closeOverlay} className="Search-close" href="" />
          </div>

          <div onClick={() => this.refs.searchInput.focus()} className={classNames('Search-bar', 'u-offset1', 'u-sm-offset5', 'u-size14', 'u-sm-offset3', 'u-sm-size10', showResult && 'show-result')}>
            <input
              ref="searchInput"
              className="Search-input t-searchInput"
              placeholder="Type to search..."
              type="text"
              onKeyUp={(event) => this.debouncedInput(event.keyCode, event.target.value.trim())}
            />
          </div>
          { showAutocomplete ? <SearchAutocomplete currentAutocompleteInx={currentAutocompleteInx} list={autocomplete} onSelect={this.selectAutocomplete} /> : null }
        </div>
        { hasSearchValue ? this.renderResults() : null }
      </div>
    )
  }
}

export default Search
