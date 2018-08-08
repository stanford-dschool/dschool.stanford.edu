import DOMComponent from '../dom-component'

class HeaderScroll extends DOMComponent {
  static bgReversed = 'bg-reversed'
  static colorReversed = 'color-reversed'
  static reversedPages = ['home', '404', 'directory']
  static selector = '[data-header]'
  static defaultPaddingTop = 40

  init() {
    this.pageType = this.root.getAttribute('data-header')
    this.elements = {
      headerTop: this.root.querySelector('[data-header-top]'),
      reverseElements: this.root.querySelectorAll('[data-reverse]'),
    }

    this.onScroll = this.onScroll.bind(this)
    this.toggleReverse = this.toggleReverse.bind(this)
    if (this.reverseByDefault()) {
      this.elements.reverseElements.forEach(element => {
        this.toggleReverse(element, true)
      })
    }
    // autohide on scroll
    window.addEventListener('scroll', this.onScroll, false)
    window.addEventListener('load', this.onScroll, false)
  }

  // header/nav colors are reversed in home and 404 pages
  reverseByDefault() {
    return HeaderScroll.reversedPages.contains(this.pageType)
  }

  toggleReverse(element, isReversed) {
    if (!this.reverseByDefault()) {
      element.classList.toggle(HeaderScroll.bgReversed, isReversed)
    }
    element.classList.toggle(HeaderScroll.colorReversed, isReversed)
  }

  onScroll() {
    // only update when scrollY is less than the padding
    let paddingTop = HeaderScroll.defaultPaddingTop
    if (getComputedStyle) {
      paddingTop = parseFloat(getComputedStyle(this.elements.headerTop).paddingTop)
    }

    // only change the colors if it's not reversed by default
    if (window.scrollY <= paddingTop) {
      this.elements.headerTop.style.transform = `translate3d(0, ${window.scrollY * -1}px, 0)`
      this.elements.headerTop.classList.remove('locked')
      if (!this.reverseByDefault()) {
        this.elements.reverseElements.forEach(element => {
          this.toggleReverse(element, false)
        })
      }
    } else {
      this.elements.headerTop.style.transform = `translate3d(0, ${paddingTop * -1}px, 0)`
      this.elements.headerTop.classList.add('locked')
      this.elements.reverseElements.forEach(element => {
        this.toggleReverse(element, true)
      })
    }
  }
}

export default HeaderScroll
