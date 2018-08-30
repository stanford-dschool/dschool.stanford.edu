class Breadcrumbs {
  static selectorTarget = '[data-breadcrumbs-target]'
  static selectorSource = '[data-breadcrumbs-source]'
  static breadcrumbsTargetElement = document.querySelector(Breadcrumbs.selectorTarget)
  static breadcrumbsSourceElement = document.querySelector(Breadcrumbs.selectorSource)

  static init() {
    if (Breadcrumbs.breadcrumbsSourceElement && Breadcrumbs.breadcrumbsTargetElement) {
      Breadcrumbs.links = Breadcrumbs.breadcrumbsSourceElement.querySelectorAll('a')

      if (Breadcrumbs.links.length > 0) {
        Breadcrumbs.replace()
      }
    }
  }

  static replace() {
    while (Breadcrumbs.breadcrumbsTargetElement.firstChild) {
      Breadcrumbs.breadcrumbsTargetElement.removeChild(
          Breadcrumbs.breadcrumbsTargetElement.firstChild)
    }

    for (const link of Breadcrumbs.links) {
      Breadcrumbs.breadcrumbsTargetElement.appendChild(link)
    }
  }
}

export default Breadcrumbs
