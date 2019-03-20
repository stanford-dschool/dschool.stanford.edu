import axios from 'axios'
import { GoogleSpreadsheet } from './vendors/google-spreadsheet'

/**
 * Get cookie's value.
 * @param {String} key
 * @returns {String|*}
 */
export function getCookie(key) {
  const name = `${key}=`
  const entries = document.cookie.split(';')
  const value = entries.find(entry => entry.indexOf(name) >= 0)

  if (value) {
    return value.trim().substring(name.length)
  }
  // not found
  return undefined
}

/** checks if it's a small screen
**/
export function isSmallScreen() {
  return window.innerWidth < 750
}

/**
 * Fetch a JSON object.
 * @param {String} url
 * @param {Object=} options
 * @throws {Error} Error on 400/500 status codes as well as on network failure.
 * @returns {Promise.<JSON>|*}
 */
export function safeFetch(url, options) {
  return axios.get(url, options).then(response => response.data)
    .catch(response => {
      throw new Error(response)
    })
}

/**
 * Returns true if node is empty or only contains whitespace.
 * @param {Node} node
 * @returns {boolean}
 */
export function isEmptyOrWhitespace(node) {
  const hasElements = node.children && node.children.length > 0
  const onlyWhitespace = /^\s*$/.test(node.textContent)
  return onlyWhitespace && !hasElements
}

/**
 * Convert a DocumentFragment to a string.
 * @param {DocumentFragment} fragment
 * @returns {string}
 */
export function fragmentToString(fragment) {
  const fragmentDIV = document.createElement('div')
  fragmentDIV.appendChild(fragment)
  return fragmentDIV.innerHTML
}

/**
 * Get element's position in the DOM, from the viewport's top point.
 * @param {HTMLElement} el
 * @returns {Number}
 */
export function offsetTop(el) {
  const { top } = el.getBoundingClientRect()
  return top + window.pageYOffset
}

/**
 * Force a relayout.
 * @param {HTMLElement} el
 * @returns {Number}
 */
export function forceLayout(el) {
  return el.offsetHeight
}

/**
 * Convert an object in a query string.
 * @param {Object} data
 * @returns {String}
 */
export function queryParams(data) {
  return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&')
}

/**
 * Get a pathname for a uri
 * @param {String} url
 * @returns {String}
 */
export function pathForUrl(url) {
  const href = encodeURI(url.trim())
  if (!href) { throw new Error('Missing URL') }
  const anchor = document.createElement('a')
  anchor.href = href
  return anchor.pathname
}

/**
 * Shuffles array.
 * @param {Array} initial The array containing the items.
 */
export function naiveShuffle(initial) {
  return initial.reduceRight((shuffled, _, counter) => {
    const index = Math.floor(Math.random() * counter)
    ;[shuffled[counter], shuffled[index]] = [shuffled[index], shuffled[counter]]
    return shuffled
  }, [...initial])
}

/**
 * Calculate the width of sidebars and optionally set a margin-right ruleset.
 * @param {String} selector - What selector to bind to
 * @param {String?} mediaQuery
 * @returns {number} - Width of the sidebar
 */
export function calculateScrollbarWidth({ selector = '.u-noScroll', mediaQuery = null }) {
  function calculateWidth() {
    // Temporary div to measure widths
    const scroll = document.createElement('div')
    const css = 'height: 50px; left: -50px; overflow: scroll; position: fixed; top: -50px; width: 50px;'
    scroll.setAttribute('style', css)
    document.body.appendChild(scroll)

    // Determine a scrollbar's width.
    const width = scroll.offsetWidth - scroll.clientWidth

    // Remove dom node
    document.body.removeChild(scroll)

    // Return the width
    return width
  }

  function setCssRuleset(sidebarWidth) {
    const style = document.createElement('style')
    let ruleset = `${selector} { margin-right: ${sidebarWidth}px; }`
    if (typeof mediaQuery === 'string') {
      ruleset = `@media ${mediaQuery} { ${ruleset} }`
    }
    style.innerText = ruleset
    document.head.appendChild(style)
  }

  const width = calculateWidth()

  if (typeof selector === 'string') {
    setCssRuleset(width)
  }

  return width
}

/**
* get data from spreadsheet
*/
export function getSpreadsheetData(callback) {
  localStorage.clear()

  const apiKey = 'AIzaSyDAytD_wRnF_zC4_ARJUNf3t2p0-vxHog0'
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/1-wJSwGoUtVqgcRdg8csqTZOmuSWIpmoqZJx4rjkkpYw/values/Sheet1?alt=json&key=' + apiKey
  const googleSpreadsheet = new GoogleSpreadsheet()

  googleSpreadsheet.url(url)
  googleSpreadsheet.load((result) => {
    if (callback) {
      callback(result)
    }
    return result
  })
}

/**
* parse a relative url
*/
export function parseUrl(url) {
  if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    return `//${url}`
  }
  return url
}

/**
* parse google drive file url
*/
export function parseGoogleDriveFileUrl(url) {
  const matches = url.match(/(file)\/d\/(.*?)\//)
  if (matches) {
    return `https://drive.google.com/uc?export=view&id=${matches[2]}`
  }
  return null
}

/**
* parse google drive image thumbnail url
*/
export function parseImageThumbnailUrl(url, size) {
  const matches = url.match(/(file)\/d\/(.*?)\//)
  const sizeString = size ? `&sz=s${size}` : ''
  if (matches) {
    return `https://drive.google.com/thumbnail?id=${matches[2]}${sizeString}`
  }
  return null
}

/**
* get a query value from url
*/
export function getQueryStringValue(key) {
  const params = (new URL(window.location)).searchParams
  return params.get(key)
}

export function simpleDebounce(func, wait) {
  let timeout = null
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}

export function truncateText(string, maxLength) {
  if (string.length > maxLength) {
    return `${string.substr(0, maxLength)}...`
  }
  return string
}

export function extractContent(htmlString) {
  const span = document.createElement('span')
  span.innerHTML = htmlString
  return span.textContent || span.innerText
}
