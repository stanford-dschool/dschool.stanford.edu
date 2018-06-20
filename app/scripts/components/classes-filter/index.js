import React from 'react'
import { render } from 'react-dom'
import DOMComponent from '../dom-component'
import Dropdown from './dropdown'

class ClassesFilter extends DOMComponent {
  static selector = '[data-classes-filter]'

  init() {
    this.classListElement = this.root.querySelector('[data-classes]')
    // convert notelist to array
    this.classes = [].slice.call(this.classListElement.querySelectorAll('li'))
    this.classListElement.innerHTML = ''

    if (this.root.querySelector('h2')) {
      const currentQuarter = this.root.querySelector('h2').textContent.split(' ')[0]
      const currentQuarterAttrVal = `quarter-${currentQuarter.toLowerCase()}`

      const quarterProps = {
        classes: this.classes,
        classListElement: this.classListElement,
        activeCss: 'is-active-quarter',
        label: 'Quarter',
        default: {
          displayName: currentQuarter,
          attr: 'data-categories',
          attrValue: currentQuarterAttrVal,
        },
        options: [
          {
            displayName: 'All Quarters',
            showAll: 'true',
          },
          {
            displayName: 'Fall',
            attr: 'data-categories',
            attrValue: 'quarter-fall',
          },
          {
            displayName: 'Winter',
            attr: 'data-categories',
            attrValue: 'quarter-winter',
          },
          {
            displayName: 'Spring',
            attr: 'data-categories',
            attrValue: 'quarter-spring',
          },
        ],
      }
      render(<Dropdown {...quarterProps} />, this.root.querySelector('.p-Filters--quarter'))
    }

    const classTypeProps = {
      classes: this.classes,
      classListElement: this.classListElement,
      activeCss: 'is-active-type',
      label: 'Class Type',
      default: {
        displayName: 'Type',
      },
      options: [
        {
          displayName: 'All Classes',
          showAll: 'true',
        },
        {
          displayName: 'Core Classes',
          attr: 'data-type',
          attrValue: 'Core',
        },
        {
          displayName: 'Boost Classes',
          attr: 'data-type',
          attrValue: 'Boost',
        },
        {
          displayName: 'Pop-Out Classes',
          attr: 'data-type',
          attrValue: 'Pop-Out',
        },
      ],
    }
    render(<Dropdown {...classTypeProps} />, this.root.querySelector('.p-Filters--classType'))

    const dayProps = {
      classes: this.classes,
      classListElement: this.classListElement,
      activeCss: 'is-active-days',
      label: 'Day of Week',
      default: {
        displayName: 'Day',
      },
      options: [
        {
          displayName: 'Any Day',
          showAll: 'true',
        },
        {
          displayName: 'Monday',
          attr: 'data-monday',
        },
        {
          displayName: 'Tuesday',
          attr: 'data-tuesday',
        },
        {
          displayName: 'Wednesday',
          attr: 'data-wednesday',
        },
        {
          displayName: 'Thursday',
          attr: 'data-thursday',
        },
        {
          displayName: 'Friday',
          attr: 'data-friday',
        },
        {
          displayName: 'Weekend',
          attr: 'data-weekend',
        },
      ],
    }
    render(<Dropdown {...dayProps} />, this.root.querySelector('.p-Filters--day'))

    const requirementsProps = {
      classes: this.classes,
      classListElement: this.classListElement,
      activeCss: 'is-active-requirements',
      label: 'Requirements',
      default: {
        displayName: 'Requirement',
      },
      options: [
        {
          displayName: 'Any',
          showAll: 'true',
        },
        {
          displayName: 'Graduate Only',
          attr: 'data-course',
          attrValue: 'pg',
        },
        {
          displayName: 'Undergraduate Only',
          attr: 'data-course',
          attrValue: 'ug',
        },
      ],
    }
    render(<Dropdown {...requirementsProps} />, this.root.querySelector('.p-Filters--requirements'))
  }

  populateWithExistingOptions(object, attr, sortingFunction) {
    const found = []
    this.classes.forEach(element => {
      const option = element.getAttribute(attr)
      if (option && found.indexOf(option) < 0) {
        found.push(option)
        object.options.push({
          displayName: option,
          attr,
          attrValue: option,
        })
      }
    })

    if (sortingFunction) {
      object.options.sort(sortingFunction)
    }

    return object
  }
}

export default ClassesFilter
