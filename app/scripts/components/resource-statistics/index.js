import React from 'react'
import { render } from 'react-dom'

import Statistics from './statistics'
import DOMComponent from '../dom-component'

class ResourceStatistics extends DOMComponent {
  static selector = '[data-resource-collection]'

  init() {
    const id = this.root.getAttribute('data-resource-collection')
    if (id) {
      render(<Statistics collectionId={id} />, this.root)
    }
  }
}

export default ResourceStatistics
