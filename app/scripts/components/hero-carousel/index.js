import DOMComponent from '../dom-component'

class HeroCarousel extends DOMComponent {
  static selector = '[data-hero-carousel]'

  init() {
    this.elements = {
      breadcrumbs: this.root.querySelectorAll('[data-hero-carousel-breadcrumb]'),
      slides: this.root.querySelectorAll('[data-hero-carousel-slide]'),
    }

    this.onBreadcrumbClick = this.onBreadcrumbClick.bind(this)
    this.elements.breadcrumbs.forEach(
        el => el.addEventListener('click', this.onBreadcrumbClick))

    this.totalSlides = this.elements.slides.length
    this.activeSlide = 0
    this.rotateSpeed = 6000
    this.makeSlideActive(this.activeSlide)
    this.rotateTimeout = setTimeout(this.autoplaySlides.bind(this),
        this.rotateSpeed)
  }

  onBreadcrumbClick(e) {
    if (this.rotateTimeout) {
      clearTimeout(this.rotateTimeout)
      this.rotateTimeout = null
    }

    this.activeSlide =
        e.target.getAttribute('data-hero-carousel-breadcrumb') - 1
    this.makeSlideActive(this.activeSlide)
  }

  autoplaySlides() {
    this.showNextSlide()
    this.rotateTimeout = setTimeout(this.autoplaySlides.bind(this),
        this.rotateSpeed)
  }

  showNextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.totalSlides
    this.makeSlideActive(this.activeSlide)
  }

  makeSlideActive(index) {
    const activeSlide = this.root.querySelector(`[data-hero-carousel-slide="${index + 1}"]`)
    if (!activeSlide) { return }

    this.elements.breadcrumbs.forEach(el => el.classList.remove('is-active'))
    this.elements.slides.forEach(el => el.classList.remove('is-active'))

    activeSlide.classList.add('is-active')
    const activeBreadcrumb = this.root.querySelector(
        `[data-hero-carousel-breadcrumb="${index + 1}"]`)
    activeBreadcrumb.classList.add('is-active')
  }
}

export default HeroCarousel
