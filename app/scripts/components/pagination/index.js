import React from 'react'
import classNames from 'classnames'

const renderPageTab = (page, onClickHandle, scrollQuery, isActive = false) =>
  (
    <a
      onClick={
        (event) => {
          event.preventDefault()
          if (scrollQuery) {
            document.querySelector(`[${scrollQuery}]`).scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => onClickHandle(page), 800)
          } else {
            onClickHandle(page)
          }
        }
      }
      key={page}
      className={classNames('Pagination-page', isActive && 'is-active')}
    >{page}
    </a>
  )

const Pagination = ({ currentPage, pageCount, queryHandle, scrollQuery = null }) => {
  const pages = new Array(pageCount).fill('')
  return (
    <div className="Pagination">
      { pages.map((page, index) => renderPageTab(index + 1, queryHandle, scrollQuery, currentPage === index + 1)) }
    </div>
  )
}

Pagination.propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  pageCount: React.PropTypes.number.isRequired,
  queryHandle: React.PropTypes.func.isRequired,
  scrollQuery: React.PropTypes.string,
}

export default Pagination
