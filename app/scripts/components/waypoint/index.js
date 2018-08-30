import { Scene } from 'scrollmagic'
import controller from '../../scroll-controller'

class Waypoint {
  static selector = '[data-waypoint]'
  static isActive = 'is-active'

  constructor(element, { triggerElement = '', isActive = Waypoint.isActive }) {
    /* @type {HTMLElement}  */
    this.element = element
    /* @type {HTMLElement}  */
    this.triggerElement = triggerElement

    this.scene = new Scene({ triggerElement })
      .setClassToggle(element, isActive)
      .addTo(controller)

    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  setTrigger(element) {
    if (!element) {
      return
    }

    this.triggerElement = element
    this.scene.triggerElement(element)
    this.onResize()
  }

  onResize = () => {
    if (this.triggerElement) {
      this.scene.duration(() => this.triggerElement.offsetHeight)
    }
  }

  static init() {
    return Array.from(document.querySelectorAll(Waypoint.selector), el => new Waypoint(el, {
      triggerElement: el.dataset.waypoint,
      isActive: el.dataset.waypointIsActive,
    }))
  }
}

export default Waypoint
