import { createElement } from 'react'
import { render } from 'react-dom'

import Gallery from './gallery'
import DOMComponent from '../dom-component'


class GalleryEnhancement extends DOMComponent {
  static selector = '.sqs-gallery-block-stacked'

  init() {
    const images = Array.from(this.root.querySelectorAll('.image-wrapper img'))
    const descriptions = Array.from(this.root.querySelectorAll('.meta'))
    const gallery = createElement(Gallery, { images, descriptions })
    this.root.classList.add('is-enhanced')
    render(gallery, this.root)
  }
}

export default GalleryEnhancement
