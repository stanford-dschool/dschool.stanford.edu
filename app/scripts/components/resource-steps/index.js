import React from 'react'
import { render } from 'react-dom'
import DOMComponent from '../dom-component'
import Steps from './steps.js'
import CTAParser from '../../dom-parsers/cta-parser'

class ResourceSteps extends DOMComponent {
  static selector = '[data-resource-steps]'

  init() {
    const steps = CTAParser.parse(this.root, true)
    render(<Steps steps={steps} />, this.root)
  }
}

export default ResourceSteps
