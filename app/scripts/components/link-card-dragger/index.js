import { createElement } from 'react'
import { render } from 'react-dom'

import Dragger from './dragger'
import DOMComponent from '../dom-component'


class LinkCardDragger extends DOMComponent {
  static selector = '[data-link-card-dragger]'

  init() {
    const cardWrap = this.root.querySelector('[data-link-cards]')
    const curTime = Date.now()
    const cards = Array.from(cardWrap.children).sort((a, b) => {
      if (a.getAttribute('data-time') < b.getAttribute('data-time')) {
        return -1
      }
      if (a.getAttribute('data-time') > b.getAttribute('data-time')) {
        return 1
      }
      return 0
    }).filter(card => curTime <= card.dataset.endtime)

    const stateValue = 0

    const dragger = createElement(Dragger, { cards, min: 0, max: 100, state: stateValue })
    this.root.classList.add('is-enhanced')
    render(dragger, this.root)
  }
}

export default LinkCardDragger
