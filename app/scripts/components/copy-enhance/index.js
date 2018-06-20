import React from 'react'
import { render } from 'react-dom'

import DOMComponent from '../dom-component'
import EmbedCard from '../embed-card'
import UpNext from '../up-next'
import FloatingImage from '../floating-image/floating-image'
import Parallax from '../parallax'

import { forceLayout, safeFetch, pathForUrl } from '../../utilities'

export default class CopyEnhance extends DOMComponent {
  static selector = '[data-copy-enhance]'

  init() {
    this.constructSocialCards()
    this.constructImages()
    this.constructUpNext()
  }

  constructUpNext() {
    const isEmpty = /(?:^|\s+)(empty)(?:$|\s+)/
    const sections = this.getBlock('[data-copy-up-next]').filter(section => !isEmpty.test(section.className))

    sections.forEach(async section => {
      try {
        const path = pathForUrl(section.innerText)
        const { collection, item } = await safeFetch(`${path}?format=json`)
        if (item) {
          const { fullUrl, title, author, assetUrl, mediaFocalPoint } = item
          render(
            <UpNext
              title={title}
              link={fullUrl}
              linkText="Read Article"
              description={author.displayName}
              tag="Related"
              image={assetUrl}
              focalPoint={{
                x: mediaFocalPoint.x * 100,
                y: mediaFocalPoint.y * 100,
              }}
            />,
            section
          )
        } else if (collection) {
          const { fullUrl, title, description, mainImage } = collection
          render(
            <UpNext
              title={title}
              link={fullUrl}
              linkText="Read Story"
              description={description}
              tag="Up next"
              image={mainImage.assetUrl}
              focalPoint={{
                x: mainImage.mediaFocalPoint.x * 100,
                y: mainImage.mediaFocalPoint.y * 100,
              }}
            />,
            section
          )
        }
      } catch (e) {
        // prevent linter warnings...
      }
    })
  }

  constructImages() {
    this.getBlock('[data-copy-image]').forEach(copy => {
      const type = copy.getAttribute('data-copy-image') || 'tall'

      copy.querySelectorAll('.image-block').forEach(block => {
        const image = block.querySelector('img')
        if (!image) { return }

        const src = image.getAttribute('data-src')
        const focalData = image.getAttribute('data-image-focal-point') || ''
        const [x, y] = focalData
          ? focalData.split(',', 2).map(n => 100 * parseFloat(n))
          : [50, 50]
        render(<FloatingImage type={type} image={src} focalPoint={{ x, y }} />, block)
      })
    })
  }

  constructSocialCards() {
    const duration = 500
    const transition = `max-height ${duration}ms`

    this.getBlock('.code-block').forEach(async block => {
      const card = await EmbedCard.buildEmbedCard(block.innerText)

      if (!card) {
        return
      }

      const { style } = block

      block.removeAttribute('id')
      block.removeAttribute('data-block-type')

      block.className = 'CopySocialCard'
      style.maxHeight = `${block.offsetHeight}px`

      forceLayout(block)

      style.webkitTransition = transition
      style.transition = transition

      render(card, block, () => {
        if (!block.children || block.children.length === 0) {
          return
        }

        style.maxHeight = `${block.children[0].offsetHeight}px`

        // Cards should be parallax-ed.
        // eslint-disable-next-line
        new Parallax(block)

        // Randomize between 0.25 and 0.75.
        style.setProperty('--random', Math.random() / 2 + 0.25)

        setTimeout(() => {
          style.maxHeight = ''
          style.webkitTransition = ''
          style.transition = ''
        }, duration)
      })
    })
  }

  getBlock(type) {
    return Array.from(this.root.querySelectorAll(`${type}`))
      .filter(block => block)
  }
}
