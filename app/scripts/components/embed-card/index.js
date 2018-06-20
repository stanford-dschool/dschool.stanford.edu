import { createElement } from 'react'
import twitter from 'twitter-text'
import { safeFetch } from '../../utilities'
import Card from './card'

/**
 * An object describing the metadata extracted from a URL.
 * @typedef {{
 *  title: String,
 *  url: String,
 *  description: String,
 *  published: Number,
 *  author: Object,
 *  provider: String
 * }} MetaData
 */

export default class EmbedCard {
  /**
   * Build React element for a given URL.
   * @param {String} fromUrl
   * @returns {ReactElement|null}
   */
  static async buildEmbedCard(fromUrl) {
    const metaData = await EmbedCard.extractMetaData(fromUrl)
    return metaData ? createElement(Card, metaData) : null
  }

  /**
   * Returns an object of all relevant meta data for a given URL.
   * @param {String} fromUrl
   * @returns {MetaData|null}
   */
  static async extractMetaData(fromUrl) {
    try {
      const endpoint = EmbedCard.endpoint(fromUrl)
      const { title, url, description, authors, provider_name, published, favicon_url, image } = await safeFetch(endpoint)
      return {
        title,
        url,
        published,
        image,
        description: EmbedCard.parseDescription(description, provider_name),
        provider: EmbedCard.parseProvider(provider_name, url),
        author: EmbedCard.parseAuthor(authors, provider_name, url, description),
        favicon: favicon_url,
      }
    } catch (e) {
      return null
    }
  }

  /**
  * Parse authors from url or description
  * @param {Object} authors
  * @param {String} providerName
  * @param {String} url
  * @param {String} description
  * @returns {Object}
  */
  static parseAuthor(authors, providerName, url, description) {
    if (!authors.name && !authors.url) {
      if (EmbedCard.parseProvider(providerName, url) === 'Facebook') {
        return {
          name: url.match('facebook.com/(.*)/posts')[1],
          url: url.match('(.*)/posts')[1],
        }
      } else if (EmbedCard.parseProvider(providerName, url) === 'Instagram') {
        return {
          name: description.match('(@(.*?)) on')[2].split(')')[0],
        }
      }
    }
    return authors
  }

  /**
   * Format the description based on the provider.
   * @param {String} description
   * @param {String} provider
   * @returns {String}
   */
  static parseDescription(description, provider) {
    switch (provider) {
      case 'Twitter': {
        return twitter.autoLink(twitter.htmlEscape(description))
      }
      case 'Instagram': {
        return description.match('“(.*?)”')[1]
      }
      default: {
        return description
      }
    }
  }

  /**
   * Get the provider from url.
   * @param {String} providerName
   * @param {String} url
   * @returns {String}
   */
  static parseProvider(providerName, url) {
    if (!providerName && url.includes('www.facebook.com')) {
      return 'Facebook'
    }
    return providerName
  }

  /**
   * Generate a endpoint with all config as query params.
   * @param {String} fromUrl
   * @returns {String}
   */
  static endpoint(fromUrl) {
    return `https://social-backend-170523.appspot.com/embed/?url=${encodeURIComponent(fromUrl)}`
  }
}
