import React from 'react'
import { render } from 'react-dom'
import Dropdown from './dropdown'
import DOMComponent from '../dom-component'

class HeaderFilter extends DOMComponent {
  static selector = '[data-header-filter-dropdown]'

  init() {
    render(
      <div>
        <Dropdown />
      </div>,
      this.root)
  }
}

export default HeaderFilter
