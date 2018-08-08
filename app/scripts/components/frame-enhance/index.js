import { offsetTop } from '../../utilities'

let isUpdating = false
let lastScrollPosition = -1
let scrollPosition
let viewHeight

class FrameEnhance {
  static selector = '.Frame-side--break'
  static items = []

  constructor(element) {
    this.element = element
    this.cache()
    this.element.classList.add('has-frame-break')
    FrameEnhance.items.push(this)
  }

  translate() {
    const viewBottom = scrollPosition + viewHeight
    let ratio = 1 - (this.top - viewBottom) / (scrollPosition - viewBottom)
    ratio = Math.max(0, Math.min(1, ratio))
    this.element.style.setProperty('--frame-break', ratio)
  }

  cache() {
    this.top = offsetTop(this.element)

    if (scrollPosition === undefined) {
      FrameEnhance.setScene()
    }

    this.translate()
  }

  static cache() {
    FrameEnhance.setScene()
    FrameEnhance.items.forEach(item => item.cache())
  }

  static setScene() {
    viewHeight = window.innerHeight || document.documentElement.clientHeight
    scrollPosition = window.pageYOffset
  }

  static init() {
    const instances = Array.from(document.querySelectorAll(FrameEnhance.selector), el => new FrameEnhance(el))

    FrameEnhance.cache()
    window.addEventListener('resize', FrameEnhance.cache, false)
    window.addEventListener('scroll', FrameEnhance.onScroll, false)

    return instances
  }

  static onAnimation() {
    for (let index = 0; index < FrameEnhance.items.length; index++) {
      FrameEnhance.items[index].translate()
    }

    isUpdating = false
  }

  static onScroll() {
    scrollPosition = window.pageYOffset

    if (scrollPosition === lastScrollPosition) {
      return
    }

    lastScrollPosition = scrollPosition

    if (!isUpdating) {
      requestAnimationFrame(FrameEnhance.onAnimation)
      isUpdating = true
    }
  }
}

export default FrameEnhance
