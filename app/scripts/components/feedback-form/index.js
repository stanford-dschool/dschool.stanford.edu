import DOMComponent from '../dom-component'

class FeedbackForm extends DOMComponent {
  static selector = '[data-feedback]'

  init() {
    this.elements = {
      open: this.root.querySelector('[data-feedback-form-open]'),
      formContainer: this.root.querySelector('[data-feedback-form]'),
    }

    if (this.elements.formContainer.querySelectorAll('.sqs-block').length > 0) {
      this.elements.open.addEventListener('click', this.onFormToggle.bind(this))
    } else {
      this.elements.open.remove()
    }
  }

  onFormToggle() {
    this.elements.formContainer.classList.toggle('is-active')
  }
}

export default FeedbackForm
