import React from 'react'
import { render } from 'react-dom'
import Search from './search'
import DOMComponent from '../dom-component'

class SearchComponent extends DOMComponent {
  static selector = '[data-search]'

  init() {
    render(<Search root={this.root} />, this.root)
  }
}

export default SearchComponent
