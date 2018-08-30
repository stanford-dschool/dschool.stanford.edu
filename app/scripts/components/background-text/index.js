import Parallax from '../parallax'

class BackgroundText {
  static selector = '[data-background-text-src]'

  constructor(element) {
    this.element = element

    this.backgroundText = document.createElement('div')
    this.backgroundText.classList.add('BackgroundText')
    this.backgroundText.innerText = element.querySelector(element.dataset.backgroundTextSrc).textContent
    this.backgroundText = this.element.appendChild(this.backgroundText)

    this.parallax = new Parallax(this.backgroundText)
  }

  static init() {
    return Array.from(document.querySelectorAll(this.selector)).map(element => new this(element))
  }
}

export default BackgroundText
