import Parallax from '../parallax'

class Accessibility {
  static selector = '[data-accessibility]'
  static accessibilityClass = 'accessibility'
  static accessibilityElement = document.querySelector(Accessibility.selector)

  static init() {
    Accessibility.accessibilityOn = Accessibility.accessibilityOn.bind(this)
    Accessibility.accessibilityOff = Accessibility.accessibilityOff.bind(this)
  }

  /**
  * add accessibility class to elements
  **/
  static accessibilityOn() {
    Accessibility.accessibilityElement.classList.add(Accessibility.accessibilityClass)
    Parallax.off()
  }

  /**
  * remove accessibility class to elements
  **/
  static accessibilityOff() {
    Accessibility.accessibilityElement.classList.remove(Accessibility.accessibilityClass)
    Parallax.on()
  }
}

export default Accessibility
