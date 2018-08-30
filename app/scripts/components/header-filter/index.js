import React from 'react'
import { render } from 'react-dom'
import Dropdown from './dropdown'
import DOMComponent from '../dom-component'

class HeaderFilter extends DOMComponent {
  static selector = '[data-header-filter-dropdown]'

  init() {
    const headerFilter = document.querySelector('[data-header-filter]')
    const audienceList = headerFilter.querySelector('ul')

    if (audienceList) {
      render(
        <div>
          <Dropdown audienceList={audienceList} headerFilter={headerFilter} />
        </div>,
      this.root)
    }
  }
}

export default HeaderFilter
