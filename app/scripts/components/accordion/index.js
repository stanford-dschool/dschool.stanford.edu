  import React from 'react'
  import { render } from 'react-dom'
  import Accordion from './accordion'
  import DOMComponent from '../dom-component'
  import TitleParser from '../../dom-parsers/title-parser'

  /**
   * Progressively enhances the DOM with a React Accordion component.
   */
  class AccordionComponent extends DOMComponent {
    static selector = '[data-accordion]'

    init() {
      const originalContent = this.root.querySelector('.sqs-block-content') || this.root
      const titleTag = (this.root.getAttribute('data-accordion') || 'h1').toUpperCase()
      const large = this.root.getAttribute('data-large') != null

      const panels = TitleParser.parse(originalContent, titleTag === 'H1')
      if (panels.length === 0) {
        return
      }

      render(<Accordion panels={panels} large={large} />, this.root)
    }
  }

  export default AccordionComponent
