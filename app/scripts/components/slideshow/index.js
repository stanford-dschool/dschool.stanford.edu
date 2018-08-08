import { createElement } from 'react'
import { render } from 'react-dom'

import Slideshow from './slideshow'
import DOMComponent from '../dom-component'

class SlideshowEnhance extends DOMComponent {
  static selector = '[data-slideshow]'

  init() {
    const slides = Array.from(this.root.children, (slide) => ({
      image: slide.getAttribute('data-slide-image'),
      title: slide.getAttribute('data-slide-title'),
      description: slide.getAttribute('data-slide-description'),
    }))
    const slideshow = createElement(Slideshow, { slides })
    render(slideshow, this.root)
  }
}

export default SlideshowEnhance
