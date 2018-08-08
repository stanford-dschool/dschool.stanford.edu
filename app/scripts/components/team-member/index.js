import { getSpreadsheetData, parseGoogleDriveFileUrl, parseUrl, getQueryStringValue } from '../../utilities'
import DOMComponent from '../dom-component'

class TeamMember extends DOMComponent {
  static selector = '[data-member]'

  init() {
    this.hash = getQueryStringValue('name')
    this.name = this.root.querySelector('[data-member-name]')
    this.title = this.root.querySelector('[data-member-title]')
    this.photo = this.root.querySelector('[data-member-photo]')
    this.summary = this.root.querySelector('[data-member-summary]')
    this.other = this.root.querySelector('[data-member-other]')
    this.about = this.root.querySelector('[data-member-about]')
    this.classes = this.root.querySelector('[data-member-classes]')
    this.learMoreConnect = this.root.querySelector('[data-learn-more-connect]')
    this.latestWork = this.root.querySelector('[data-latest-work]')

    this.load = this.load.bind(this)
    window.addEventListener('load', this.load, false)
  }

  /**
  * insert data from the spreadsheet on load
  */
  load() {
    getSpreadsheetData((googleSpreadsheet) => {
      const data = googleSpreadsheet.data
      if (data[this.hash]) {
        const person = data[this.hash]
        this.setElementContent(this.name, `${person.firstname} ${person.lastname}`)
        this.setElementContent(this.title, person.title)
        this.setSectionContent(this.summary, person.summary)
        this.setSectionContent(this.other, person.other)
        this.setSectionContent(this.about, person.about)
        this.setListContent(this.classes, person.classes)
        this.setListContent(this.learMoreConnect, person.learnmoreconnect)
        this.setColumnContent(this.latestWork, person.latestwork)
        this.setImage(this.photo, person.photo)
      }
    })
  }

  /**
  * set image from google drive url
  */
  setImage(element, googleDriveUrl) {
    if (element) {
      const srcUrl = parseGoogleDriveFileUrl(googleDriveUrl.trim())
      if (srcUrl) {
        element.style.backgroundImage = `url(${srcUrl})`
        element.classList.remove('u-hide')
      }
    }
  }

  /**
  * set element's innerHTML value
  */
  setElementContent(element, value) {
    if (element && value) {
      element.innerHTML = value
    }
  }

  /**
  * set sections text content
  */
  setSectionContent(rootElement, value) {
    if (rootElement) {
      const contentElement = rootElement.querySelector('[data-section-content]')
      if (contentElement && value) {
        contentElement.innerHTML = value
        rootElement.classList.remove('u-hide')
      }
    }
  }

  /**
  * fill out list's content
  * @param rootElement
  * @param values: an array of values
  */
  setListContent(rootElement, values) {
    if (rootElement) {
      const parentElement = rootElement.querySelector('[data-section-content]')
      if (values && parentElement) {
        const parsedValues = values.split(';')
        parsedValues.forEach(value => {
          const parsedValue = value.split(',')
          const listElement = document.createElement('li')
          if (parentElement.classList.contains('List')) {
            listElement.classList.add('List-item')
          }
          const linkElement = document.createElement('a')
          linkElement.classList.add('t-capitalize')
          const periodElement = document.createElement('div')
          periodElement.classList.add('t-period')

          linkElement.innerHTML = parsedValue[0].trim()
          if (parsedValue[1]) {
            linkElement.setAttribute('href', parseUrl(parsedValue[1].trim()))
            linkElement.setAttribute('target', '_blank')
          }
          listElement.appendChild(linkElement)

          if (parsedValue[2]) {
            this.setElementContent(periodElement, parsedValue[2].trim())
            listElement.appendChild(periodElement)
          }

          parentElement.appendChild(listElement)
        })
        rootElement.classList.remove('u-hide')
      }
    }
  }

  /**
  * create columns
  */
  setColumnContent(rootElement, values) {
    if (rootElement) {
      const parentElement = rootElement.querySelector('[data-section-content]')
      if (values && parentElement) {
        const parsedValues = values.split(';')
        parsedValues.forEach(value => {
          const parsedValue = value.split(',')
          const columnItemElement = document.createElement('div')
          columnItemElement.classList.add('Columns-item')
          const borderedBoxElement = document.createElement('div')
          borderedBoxElement.classList.add('BorderedBox')
          const linkElement = document.createElement('a')
          linkElement.classList.add('BorderedBox-content')
          linkElement.setAttribute('target', '_blank')
          const tagElement = document.createElement('h3')
          tagElement.classList.add('BorderedBox-tag')
          const titleElement = document.createElement('h4')
          titleElement.classList.add('BorderedBox-title')

          if (parsedValue[1]) {
            linkElement.setAttribute('href', parseUrl(parsedValue[1].trim()))
          }
          this.setElementContent(titleElement, parsedValue[0].trim())
          linkElement.appendChild(tagElement)
          linkElement.appendChild(titleElement)

          borderedBoxElement.appendChild(linkElement)

          columnItemElement.appendChild(borderedBoxElement)

          parentElement.appendChild(columnItemElement)
        })
        rootElement.classList.remove('u-hide')
      }
    }
  }
}

export default TeamMember
