class Form {
  static selector = '.sqs-block-form'
  static inputSelector = 'input[type=radio], input[type=checkbox]'

  constructor(element) {
    this.inputs = Array.from(element.querySelectorAll(Form.inputSelector))
    this.button = element.querySelector('.form-button-wrapper')
    this.styleButton()
    element.addEventListener('click', this.onClick)
  }

  styleButton() {
    this.buttonArrow = document.createElement('span')
    this.buttonArrow.classList.add('CtaButton-arrow', 'DirectionalArrow', 'DirectionalArrow--right')

    this.button.classList.add('CtaButton')
    this.button.appendChild(this.buttonArrow)
  }

  onClick = event => {
    const { target } = event

    if (target && target.nodeName === 'INPUT') {
      this.inputs.forEach(input => {
        if (input.checked) {
          input.parentNode.classList.add('is-selected')
        } else {
          input.parentNode.classList.remove('is-selected')
        }
      })
    }
  }

  static init() {
    return Array.from(document.querySelectorAll(this.selector)).map(element => new this(element))
  }
}

export default Form
