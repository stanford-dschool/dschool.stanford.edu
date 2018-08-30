import scrollTo from '../scroll-to'

class QuickNav {
  static selector = '.QuickNav, .Header-scrollIndicator'

  constructor(element) {
    element.addEventListener('click', this.onClick)
    this.removeJumpLink()
  }

  onClick = event => {
    const { target } = event
    if (target && target.nodeName === 'A') {
      event.preventDefault()
      scrollTo.to(document.querySelector(target.getAttribute('href')))
    }
  }

  /*
  * Remove jump links that points to an empty <section>
  * A section is empty if:
  * - it contains a <div> with an empty class (like #context and #social links *   in resouces-collection)
  */
  removeJumpLink = () => {
    const quickNavItem = Array.from(document.getElementsByClassName('QuickNav-item'))
    quickNavItem.forEach((li) => {
      const id = li.children[0].href.split('#')[1]
      const emptyBlock = document.querySelectorAll(`#${id} .empty`)
      if (emptyBlock.length > 0) {
        li.remove()
      }
    })
  }

  static init() {
    return Array.from(document.querySelectorAll(this.selector)).map(element => new this(element))
  }
}

export default QuickNav
