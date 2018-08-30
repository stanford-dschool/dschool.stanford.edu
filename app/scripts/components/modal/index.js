import React from 'react'
import { render } from 'react-dom'

import Modal from './modal'
import DOMComponent from '../dom-component'

class BuildModal extends DOMComponent {
  static selector = '[data-team-members]'
  static modal = document.querySelector('[data-modal]')

  init() {
    const selector = '[data-team-member]'
    this.teamElements = Array.from(this.root.querySelectorAll(selector))

    this.team = this.teamElements.map(teamMemberEl => ({
      name: teamMemberEl.querySelector('.TeamMember-name'),
      title: teamMemberEl.querySelector('.TeamMember-details .sqs-row > .col > div:first-child'),
      text: teamMemberEl.querySelector('.TeamMember-details .sqs-row > .col > div:nth-child(2)'),
      links: teamMemberEl.querySelectorAll('.TeamMember-details .sqs-row > .col > div:nth-child(3) a'),
      image: teamMemberEl.querySelector('.TeamMember-picture img'),
    })).map(({ name, title, text, links, image }) => ({
      name: name && name.textContent,
      title: title && title.textContent,
      text1: text && text.textContent.replace(/[“”]+/g, '').split('//')[0],
      text2: text && text.textContent.replace(/[“”]+/g, '').split('//')[1],
      image: image && image.src,
      links: Array.from(links).map(link => ({
        url: link.href,
        label: link.textContent,
      })),
    }))

    BuildModal.close = BuildModal.close.bind(this)
    this.onClickTeamMember = this.onClickTeamMember.bind(this)

    this.root.addEventListener('click', this.onClickTeamMember, false)
  }

  open(index) {
    document.documentElement.classList.add('u-noScroll', 'modal-is-open')
    BuildModal.modal.classList.add('is-open')
    render(
      <Modal isOpen={this.isOpen} team={this.team} onClose={BuildModal.close} index={index} />,
      BuildModal.modal
    )
  }

  static close() {
    BuildModal.modal.classList.remove('is-open')
    document.documentElement.classList.remove('u-noScroll', 'modal-is-open')
  }

  onClickTeamMember(event) {
    const { target } = event
    const index = this.teamElements.findIndex(element => element.contains(target))

    if (index > -1) {
      event.preventDefault()
      this.open(index)
    }
  }
}

export default BuildModal
