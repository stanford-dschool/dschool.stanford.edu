import { createElement } from 'react'
import { render } from 'react-dom'

import LoadMore from './load-more'
import DOMComponent from '../dom-component'

class LoadMoreEnhance extends DOMComponent {
  static selector = '[data-load-more]'

  init() {
    render(createElement(LoadMore, this.props), this.root)
  }

  get props() {
    return {
      type: this.root.getAttribute('data-load-more'),
      source: this.root.getAttribute('data-load-src'),
      category: this.root.getAttribute('data-load-category'),
      tag: this.root.getAttribute('data-load-tag'),
    }
  }
}

export default LoadMoreEnhance
