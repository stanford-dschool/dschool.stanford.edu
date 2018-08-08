import { createElement } from 'react'
import { render } from 'react-dom'

import slider from './story-slider'
import DOMComponent from '../dom-component'

class StorySlider extends DOMComponent {
  static selector = '.Story-slider'

  init() {
    const sliderElem = createElement(slider)
    this.root.classList.add('content-load')
    render(sliderElem, this.root)
  }
}

export default StorySlider
