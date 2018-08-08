import React from 'react'
import { render } from 'react-dom'
import DOMComponent from '../dom-component'
import Filter from './filter'

class ResourceFilter extends DOMComponent {
  static selector = '[data-resource-filter]'

  init() {
    render(<Filter {...this.props} />, this.root.querySelector('.p-AllResourcesFilterable'))
  }

  get props() {
    return {
      source: this.root.getAttribute('data-resource-filter-source'),
    }
  }
}

export default ResourceFilter
