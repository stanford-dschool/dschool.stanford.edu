import React from 'react'
import { render } from 'react-dom'
import DOMComponent from '../dom-component'
import QuarterSelector from './selector'

class QuarterFilter extends DOMComponent {
  static selector = '[data-quarter-filter]'

  init() {
    this.classes = Array.from(this.root.querySelectorAll('.p-Class'))
    this.elements = {
      info: this.root.querySelector('.p-QuarterDetails'),
      bg: this.root.querySelector('.BackgroundText'),
    }
    const quarterDetails = this.saveQtrDetails()

    const quarterProps = {
      classes: this.classes,
      elements: this.elements,
      attr: 'data-categories',
      defaultQuarter: 'quarter-current',
      quarters: [
        {
          quarter: 'quarter-current',
          tagline: quarterDetails[0].tagline,
          name: quarterDetails[0].title,
          info: quarterDetails[0].info,
        },
        {
          quarter: 'quarter-next',
          tagline: quarterDetails[1].tagline,
          name: quarterDetails[1].title,
          info: quarterDetails[1].info,
        },
        {
          quarter: 'quarter-after-next',
          tagline: quarterDetails[2].tagline,
          name: quarterDetails[2].title,
          info: quarterDetails[2].info,
        },
      ],
    }
    render(<QuarterSelector {...quarterProps} />, this.root.querySelector('.QuarterFilter'))
  }

  // get details from the sqs #semester block
  saveQtrDetails() {
    const details = []
    const detailElms = {
      titles: this.elements.info.querySelectorAll('h2'),
      taglines: this.elements.info.querySelectorAll('h1'),
      info: this.elements.info.querySelectorAll('p'),
    }
    detailElms.titles.forEach((element, i) => {
      details.push({
        title: element,
        tagline: detailElms.taglines[i],
        info: detailElms.info[i],
      })
    })
    return details
  }
}

export default QuarterFilter
