import React from 'react'
import { render } from 'react-dom'

import DOMComponent from '../dom-component'

export default class SearchEnhance extends DOMComponent {
  static selector = '[data-search-enhance]'

  init() {
    if (window.location.pathname.split('/')[1] === 'search') {
      document.body.classList.add('search')
      this.addTitle()
    }
  }

  addTitle() {
    try {
      render(
        <div className="Header-description"><p>Search</p></div>,
        this.root
      )
    } catch (e) {
      // prevent linter warnings...
    }
  }
}
