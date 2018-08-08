import DOMComponent from '../dom-component'

class ResourceList extends DOMComponent {
  static selector = '[data-resource-list]'

  init() {
    this.removeDuplicate()
  }

  removeDuplicate() {
    document.querySelectorAll(ResourceList.selector).forEach((element) => {
      const parentId = element.dataset.collectionId
      const list = element.childNodes
      list.forEach((child) => {
        if (child.dataset && child.dataset.id === parentId) {
          child.remove()
        }
      })
    })
  }
}

export default ResourceList
