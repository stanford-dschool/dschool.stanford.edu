import { getCookie } from '../../utilities'
import DOMComponent from '../dom-component'
import Accessibility from '../accessibility'

class AccessibilityButton extends DOMComponent {
  static selector = '[data-accessibility-button]'

  init() {
    this.switchMode = this.switchMode.bind(this)
    this.options = this.root.querySelectorAll('[data-accessibility-toggle]')

    this.options.forEach(option => {
      option.addEventListener('click', () => {
        this.switchMode(option.getAttribute('data-accessibility-toggle'))
      })
    })

    this.currentMode()
  }

  /*
  * detects current mode
  */
  currentMode() {
    const accessibilityValue = getCookie('accessibility')
    this.options.forEach(option => {
      option.classList.toggle('active-link', accessibilityValue === option.getAttribute('data-accessibility-toggle'))
    })
  }

  /**
  * detect accessibility mode
  * @param boolean
  */
  switchMode(mode) {
    if (mode === 'true') {
      Accessibility.accessibilityOn()
    } else {
      Accessibility.accessibilityOff()
    }
    document.cookie = `accessibility=${mode};path=/`
    this.currentMode(mode)
  }
}

export default AccessibilityButton
