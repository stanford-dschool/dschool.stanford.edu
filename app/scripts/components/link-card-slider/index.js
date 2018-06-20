import { createElement } from 'react'
import { render } from 'react-dom'

import Slider from './slider'
import DOMComponent from '../dom-component'

import { naiveShuffle } from '../../utilities'

class LinkCardSlider extends DOMComponent {
  static selector = '[data-link-card-slider]'

  init() {
    const cardWrap = this.root.querySelector('[data-link-cards]')
    const cards = naiveShuffle(Array.from(cardWrap.children))
    const slider = createElement(Slider, { cards })
    this.root.classList.add('is-enhanced')
    render(slider, this.root)
  }
}

export default LinkCardSlider
