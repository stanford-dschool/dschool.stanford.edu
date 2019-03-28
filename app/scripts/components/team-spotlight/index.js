import { getSpreadsheetData } from '../../utilities'
import DOMComponent from '../dom-component'

export default class TeamSpotlight extends DOMComponent {
  static selector = '[data-team-spotlight]'

  init() {
    this.cards = [{}, {}, {}, {}, {}, {}]
    this.sheetData = null
    this.sheetDataList = null
    this.listLength = null

    for (let i = 0; i < 6; i++) {
      const cardComponent = this.root.querySelector(`[data-team-spotlight-${i + 1}]`)
      this.cards[i].name = cardComponent.querySelector('[data-team-spotlight-name]')
      this.cards[i].text = cardComponent.querySelector('[data-team-spotlight-text]')
      this.cards[i].link = cardComponent.querySelector('[data-team-spotlight-link]')
      this.cards[i].imageFront = cardComponent.querySelector('[data-team-spotlight-image-front]')
      this.cards[i].imageBack = cardComponent.querySelector('[data-team-spotlight-image-back]')
    }

    this.updateCards = this.updateCards.bind(this)
    this.updateCard = this.updateCard.bind(this)
    this.load = this.load.bind(this)
    this.generateRandomIndices = this.generateRandomIndices.bind(this)

    this.load()
  }

  load() {
    getSpreadsheetData((googleSpreadsheet) => {
      const tempData = googleSpreadsheet.data
      const tempList = Object.keys(tempData)
      for (let i = 0; i < tempList.length; i++) {
        if (!tempData[tempList[i]].cardtext) {
          delete tempData[tempList[i]]
        } else if (!tempData[tempList[i]].cardphoto) {
          if (tempData[tempList[i]].photo) {
            tempData[tempList[i]].cardphoto = tempData[tempList[i]].photo
          } else {
            delete tempData[tempList[i]]
          }
        }
      }
      this.sheetData = tempData
      this.sheetDataList = Object.keys(this.sheetData)
      this.listLength = this.sheetDataList.length
      this.updateCards(true)
    })
  }

  updateCards(isInit) {
    const randomIndices = this.generateRandomIndices()

    for (let i = 0; i < randomIndices.length; i++) {
      const cardData = this.sheetData[this.sheetDataList[randomIndices[i]]]
      const cardElem = this.cards[i]

      window.setTimeout(() => {
        this.updateCard(cardElem, cardData)
      }, isInit ? 0 : 150 * i)
    }

    window.setTimeout(this.updateCards, 20000)
  }

  updateCard(cardElem, cardData) {
    const srcUrl = cardData.cardphoto.trim()
    const img = new Image()

    cardElem.imageBack.style.backgroundImage = cardElem.imageFront.style.backgroundImage
    cardElem.imageFront.classList.remove('is-ready')

    img.onload = function () {
      this.setElementContent(cardElem.name, `${cardData.firstname} ${cardData.lastname}`)
      this.setElementContent(cardElem.text, cardData.cardtext)
      this.setImage(cardElem.imageFront, srcUrl)
      this.setLink(cardElem.link, cardData.url)

      window.setTimeout(() => {
        cardElem.imageFront.classList.add('is-ready')
      }, 100)
    }.bind(this)
    img.src = srcUrl
  }

  setElementContent(element, value) {
    if (element) {
      if (value) {
        element.innerHTML = value
      } else {
        element.innerHTML = ''
      }
    }
  }

  setImage(element, srcUrl) {
    if (element && srcUrl) {
      element.style.backgroundImage = `url(${srcUrl})`
    }
  }

  setLink(element, userId) {
    if (element) {
      const url = `/team-member?name=${userId.trim()}`
      if (url) {
        element.setAttribute('href', url)
      }
    }
  }

  generateRandomIndices() {
    const randomIndices = []
    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * this.listLength)
      while (randomIndices.indexOf(randomIndex) !== -1) {
        randomIndex = Math.floor(Math.random() * this.listLength)
      }
      randomIndices.push(randomIndex)
    }
    return randomIndices
  }
}
