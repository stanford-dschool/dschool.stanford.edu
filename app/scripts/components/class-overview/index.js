import { createElement } from 'react'
import { render } from 'react-dom'
import DOMComponent from '../dom-component'
import Groups from './groups'

class ClassOverview extends DOMComponent {
  static selector = '[data-class-overview]'

  init() {
    this.groups = createElement(Groups, { groups: this.getGroupProps() })
    this.component = render(this.groups, this.root)
  }

  getGroupProps() {
    return Array.from(this.root.children, group => ({
      id: group.id,
      name: group.querySelector('.p-Classes-groupIntro h1').innerText,
      data: group.innerHTML,
    }))
  }
}

export default ClassOverview
