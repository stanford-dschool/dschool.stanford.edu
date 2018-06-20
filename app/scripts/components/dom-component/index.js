function instantiateComponent(selector, Component) {
  if (typeof selector !== 'string' || selector === '') { throw new Error(`${selector} is not a valid CSS selector.`) }
  if (!Component.prototype) { throw new Error(`${Component} is not a constructor.`) }
  return Array.from(document.querySelectorAll(selector), (node) => new Component(node, node.dataset))
}

class DOMComponent {
  constructor(root, ...args) {
    this.root = root
    this.init(...args)
  }

  static init() {
    return instantiateComponent(this.selector, this)
  }
}

export default DOMComponent
