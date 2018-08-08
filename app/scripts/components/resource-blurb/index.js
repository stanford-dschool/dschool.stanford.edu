import DOMComponent from '../dom-component'

class ResourceBlurb extends DOMComponent {
  static selector = '[data-resource-blurb]'

  init() {
    const tagsValue = this.root.getAttribute('data-resource-blurb')
    const tags = (tagsValue || '').split(',')
    const fields = tags.reduce((result, tag) => {
      const [field, label] = tag.split(':')
      if (label) {
        result[field] = label.trim()
      }
      return result
    }, {})

    this.appendField('An ', fields.Type)
    this.appendField(' about ', fields.About)
    this.appendField(' for ', fields.For)
  }

  appendField(label, value) {
    if (!value) {
      return
    }

    const valueEl = document.createElement('span')
    valueEl.className = 'p-Blurb-value'
    valueEl.textContent = value

    this.root.appendChild(document.createTextNode(label))
    this.root.appendChild(valueEl)
  }
}

export default ResourceBlurb
