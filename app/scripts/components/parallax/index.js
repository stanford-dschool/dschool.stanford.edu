import { offsetTop } from '../../utilities'

let isUpdating = false
let lastScrollPosition = -1
let scrollPosition
let viewHeight

class Parallax {
  static selector = '[data-parallax]'
  static items = []

  constructor(element) {
    this.element = element
    this.cache()
    Parallax.items.push(this)
  }

  translate() {
    const viewBottom = scrollPosition + viewHeight
    const ratio = (this.top - viewBottom) / (scrollPosition - viewBottom)
    if (this.element.classList.contains('has-parallax')) {
      this.element.style.setProperty('--parallax', ratio)
    }
  }

  cache() {
    this.top = offsetTop(this.element)

    if (scrollPosition === undefined) {
      Parallax.setScene()
    }

    this.translate()
  }

  static on() {
    Parallax.items.forEach(item => item.element.classList.add('has-parallax'))
  }

  static off() {
    Parallax.items.forEach(item => item.element.classList.remove('has-parallax'))
  }

  static cache() {
    Parallax.setScene()
    Parallax.items.forEach(item => item.cache())
  }

  static setScene() {
    viewHeight = window.innerHeight || document.documentElement.clientHeight
    scrollPosition = window.pageYOffset
  }

  static init() {
    const instances = Array.from(document.querySelectorAll(Parallax.selector), el => new Parallax(el))

    window.addEventListener('resize', Parallax.cache, false)
    window.addEventListener('scroll', Parallax.onScroll, false)
    window.addEventListener('load', Parallax.cache, false)

    Parallax.on = Parallax.on.bind(this)
    Parallax.off = Parallax.off.bind(this)

    return instances
  }

  static onAnimation() {
    for (let index = 0; index < Parallax.items.length; index++) {
      Parallax.items[index].translate()
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
      requestAnimationFrame(Parallax.onAnimation)
      isUpdating = true
    }
  }
}

export default Parallax
