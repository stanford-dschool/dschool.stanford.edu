import { Scene } from 'scrollmagic'
import controller from '../../scroll-controller'

class Affix {
  static selector = '[data-affix]'
  static durationOffset = 100

  constructor(triggerElement, { offset, offsetParent }) {
    this.triggerElement = triggerElement
    this.offsetParent = offsetParent

    this.scene = new Scene({
      triggerElement,
      triggerHook: 'onLeave',
      offset: parseFloat(offset),
    })
      .setPin(triggerElement)
      .addTo(controller)

    requestAnimationFrame(this.onResize)
    window.addEventListener('resize', this.onResize)
  }

  set offsetParent(cssSelector) {
    this.offsetParentNode = document.querySelector(cssSelector)
  }

  onResize = () => {
    if (this.offsetParentNode) {
      this.scene.duration(this.offsetParentNode.offsetHeight - this.triggerElement.offsetHeight)
    }
  }

  static init() {
    return Array.from(
      document.querySelectorAll(Affix.selector),
      el => new Affix(el, {
        offset: el.dataset.affixOffset,
        offsetParent: el.dataset.affixOffsetParent,
      })
    )
  }
}

export default Affix
