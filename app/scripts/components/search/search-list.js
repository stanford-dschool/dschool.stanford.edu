import React from 'react'
import Pagination from '../pagination'
import { extractContent } from '../../utilities'

class SearchList extends React.Component {
  static propTypes = {
    results: React.PropTypes.arrayOf(React.PropTypes.object),
    currentPage: React.PropTypes.number,
    pageCount: React.PropTypes.number,
    queryHandle: React.PropTypes.func,
  }

  renderResult = (result, index) => {
    const theme = result.theme_type
    let description = extractContent(result.description) || result.highlight.body || result.highlight.sections
    const titleHTML = result.highlight.sections || result.highlight.title
    const title = result.title
    const header = result.content_type ? result.content_type.split('-').join(' ') : result.sections[0]
    const date = result.published_at

    if (description && description.length > 120) {
      description = description.slice(0, 120) + '...'
    }

    return (
      <li key={index} className="Search-list-item">
        <div className="Search-list-item-img" style={{ backgroundImage: `url('${result.image}')` }} />
        <div className="Search-list-item-content">
          <p className={`t-tag Color--${theme}`}>{header}</p>
          {
            title ?
              (<a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="t-searchItemTitle"
              >{title}
              </a>) :
              (<a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="t-searchItemTitle"
                dangerouslySetInnerHTML={{ __html: titleHTML }}
              />
              )
          }
          {description ? <div className="Search-list-item-description" dangerouslySetInnerHTML={{ __html: `${description}` }} /> : null}
        </div>
      </li>
    )
  }

  render() {
    const { currentPage, pageCount, queryHandle, results } = this.props
    if (results) {
      return (
        <div data-search-list className="Search-list-wrapper u-md-size9">
          {results.length > 0 ? <div className="Search-list-title t-searchResultTitle">Results</div> : null }
          <ul className="Search-list">
            {results.map((result, index) => this.renderResult(result, index))}
          </ul>
          {pageCount > 1 ? <Pagination scrollQuery="data-search-list" currentPage={currentPage} pageCount={pageCount} queryHandle={queryHandle} /> : null}
        </div>
      )
    }
    return null
  }
}

export default SearchList
