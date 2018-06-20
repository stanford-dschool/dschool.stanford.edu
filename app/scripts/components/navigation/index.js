import { isSmallScreen } from '../../utilities'
import DOMComponent from '../dom-component'

class Navigation extends DOMComponent {
  static isActive = 'is-active'
  static isExpanded = 'is-expanded'
  static selector = '[data-navigation]'
  static initialDelay = 0
  static incrementalDelay = 50

  init() {
    this.elements = {
      toggle: this.root.querySelector('[data-navigation-toggle]'),
      list: this.root.querySelector('[data-navigation-list]'),
      links: this.root.querySelectorAll('[data-navigation-link]'),
      dropdownToggle: this.root.querySelectorAll('[data-dropdown-toggle]'),
    }

    this.onResize = this.onResize.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)

    this.elements.toggle.addEventListener('click', this.onToggle)
    this.elements.list.addEventListener('transitionend', this.onTransitionEnd)

    this.elements.links.forEach(link => {
      this.detectLocation(link)
    })

    // dropdown
    this.elements.dropdownToggle.forEach(listItem => {
      listItem.addEventListener('mouseover', (event) => {
        if (!isSmallScreen()) {
          this.toggleMenuDropdown(true, listItem, event)
        }
      })

      listItem.addEventListener('mouseout', (event) => {
        if (!isSmallScreen()) {
          this.toggleMenuDropdown(false, listItem, event)
        }
      })

      listItem.addEventListener('mouseup', (event) => {
        this.toggleMenuDropdown(!this.isDropdownActive, listItem, event)
      })
    })

    this.isNavigationOpen = false
    this.isDropdownActive = false
  }

  onTransitionEnd() {
    document.documentElement.classList.toggle('u-noScroll', this.isNavigationOpen)
  }

  onResize() {
    // desktop
    if (!isSmallScreen()) {
      this.root.classList.remove(Navigation.isExpanded)
      this.isNavigationOpen = false
      this.elements.toggle.setAttribute('aria-expanded', `${this.isNavigationOpen}`)
      this.elements.list.setAttribute('aria-hidden', `${!this.isNavigationOpen}`)
    }
  }

  onToggle() {
    this.isNavigationOpen = !this.isNavigationOpen
    this.root.classList.toggle(Navigation.isExpanded, this.isNavigationOpen)

    // add transition delays to subnav
    this.subnavTransition(this.elements.dropdownToggle)

    this.elements.toggle.setAttribute('aria-expanded', `${this.isNavigationOpen}`)
    this.elements.list.setAttribute('aria-hidden', `${!this.isNavigationOpen}`)

    // remove all delays that was added in toggle dropdown
    if (!this.isNavigationOpen) {
      window.removeEventListener('resize', this.onResize)
      this.elements.dropdownToggle.forEach(listItem => {
        listItem.style.transitionDelay = null
      })
    } else {
      window.addEventListener('resize', this.onResize)
    }
  }


  /**
  * @param list of DOM element
  * @param boolean
  **/
  subnavTransition = (items) => {
    items.forEach(item => {
      const navListElement = item.querySelectorAll('[data-navigaion-dropdown-item]')
      navListElement.forEach((element, index) => {
        if (this.isNavigationOpen) {
          element.style.transitionDelay = `${Navigation.initialDelay + Navigation.incrementalDelay * index}ms`
        } else {
          element.style.transitionDelay = null
        }
      })
    })
  }

  /**
  * add is-active class if the link in navigation is active
  * @param DOM element
  */
  detectLocation(linkElement) {
    this.trimDropdownLink(linkElement)

    if (linkElement.pathname === window.location.pathname) {
      linkElement.classList.add(Navigation.isActive)
    }
  }

  /**
  * trim [placeholder]-dropdown url tp [placeholder] for subnavTransition
  * @param String
  **/
  trimDropdownLink(link) {
    const topTierLink = link.href.split('-dropdown')[0]
    link.setAttribute('href', topTierLink)
  }

  /**
  * set dropdown height only if it's on mobile and nav is open
  * @param DOM element
  * @param DOM element
  * @param DOM element
  **/
  setDropdownHeight = (dropdownElement, listItem, linkElement) => {
    if (this.isDropdownActive && this.isNavigationOpen) {
      const dropdownHeight = parseFloat(getComputedStyle(dropdownElement).height) + parseFloat(getComputedStyle(linkElement).height)
      listItem.style.height = `${dropdownHeight}px`
      listItem.style.transitionDelay = '0ms'
    } else {
      listItem.style.height = null
    }
  }

  /**
  * toggle dropdown
  * @param boolean
  * @param DOM element
  **/
  toggleMenuDropdown = (isDropdownActive, listItem, event) => {
    const linkElement = listItem.querySelector('[data-dropdown-link]')
    const dropdownElement = listItem.querySelector('[data-navigation-dropdown]')
    // for mobile: prevent hover and click event to trigger at the same time
    if ((isSmallScreen() && event.target !== linkElement) ||
        !isSmallScreen()) {
      this.isDropdownActive = isDropdownActive
      listItem.classList.toggle(Navigation.isActive, this.isDropdownActive)
      linkElement.setAttribute('aria-expanded', `${this.isDropdownActive}`)
      dropdownElement.setAttribute('aria-hidden', `${!this.isDropdownActive}`)
    }
    this.setDropdownHeight(dropdownElement, listItem, linkElement)
  }
}

export default Navigation
