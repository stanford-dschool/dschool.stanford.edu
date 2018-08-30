import { createElement } from 'react'
import { render } from 'react-dom'
import DOMComponent from '../dom-component'

import Directory from './directory'

class TeamDirectory extends DOMComponent {
  static selector = '[data-directory]'

  init() {
    render(createElement(Directory, this.props), this.root)
  }

  get props() {
    return {
      search: this.root.getAttribute('data-directory-search'),
      filter: '',
    }
  }
}

export default TeamDirectory
