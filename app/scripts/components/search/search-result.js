import React from 'react'
import classNames from 'classnames'

const SearchResult = ({ expand, children }) =>
  (
    <div className={classNames('Search-result', expand && 'is-expanded')}>
      {children}
    </div>
  )

SearchResult.propTypes = {
  expand: React.PropTypes.bool,
  children: React.PropTypes.node,
}

export default SearchResult
