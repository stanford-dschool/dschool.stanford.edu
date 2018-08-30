import React from 'react'
import classNames from 'classnames'

const SearchAutocomplete = ({ currentAutocompleteInx, list, onSelect }) =>
  (
    <ul className="Search-autocomplete u-offset1 u-size14 u-sm-offset3 u-sm-size10">
      { list.map((item, key) => (
        <li
          key={key}
          onClick={() => onSelect(item)}
          dangerouslySetInnerHTML={{ __html: item }}
          className={classNames('Search-autocomplete-item', 't-searchInput', key === currentAutocompleteInx && 'is-active')}
        />
        ))
      }
    </ul>
  )

SearchAutocomplete.propTypes = {
  currentAutocompleteInx: React.PropTypes.number,
  list: React.PropTypes.array,
  onSelect: React.PropTypes.func,
}

export default SearchAutocomplete
