import React from 'react'
import { render } from 'react-dom'
import Card from './card'
import DOMComponent from '../dom-component'
import CTAParser from '../../dom-parsers/cta-parser'

/**
 * Progressively enhances the DOM with a React Accordion component.
 */
class CTACards extends DOMComponent {
  static selector = '[data-cta-cards]'

  init() {
    const ctas = CTAParser.parse(this.root)
    render((
      <div>
        {ctas.map(cta => (
          <Card key={cta.title} {...cta} />
        ))}
      </div>
    ), this.root)
  }
}

export default CTACards
