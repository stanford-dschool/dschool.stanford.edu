import React from 'react'
import { render } from 'react-dom'
import FloatingImage from './floating-image'

class FloatingImageEnhance {
  static selector = '.FloatingImage'

  static enhance(wrapper) {
    const titleEl = wrapper.querySelector('.image-caption')
    let title = ''
    if (titleEl) {
      title = titleEl.innerText.trim()
    }

    let img = ''
    const imgEl = wrapper.querySelector('img')
    if (imgEl) {
      img = imgEl.getAttribute('src') || imgEl.getAttribute('data-src')
    }

    const detailsEl = wrapper.querySelector(`${FloatingImageEnhance.selector}-details`)
    let details = ''
    if (detailsEl) {
      details = detailsEl.innerHTML
    }

    const floatingImage = React.createElement(FloatingImage, { image: img, title, details })
    wrapper.classList.add('FloatingImage--enhanced')
    render(floatingImage, wrapper)
    return floatingImage
  }

  static init() {
    return Array.from(document.querySelectorAll(this.selector)).map(this.enhance)
  }
}

export default FloatingImageEnhance
