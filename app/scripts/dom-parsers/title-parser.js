import { isEmptyOrWhitespace, fragmentToString } from '../utilities'

class TitleParser {
  /**
   * Parses structured titles and contents from a wysiwyg node.
   *
   * @param {Element} root
   * @param {boolean} useHeadings
   * @return {object[]} parsed title sections
   */
  static parse(root, useHeadings) {
    const nodes = Array.from(root.children)
    const reducer = useHeadings ? TitleParser.reduceHeadingTitles : TitleParser.reduceBoldTitles

    return nodes.reduce(reducer, []).map(props => ({
      ...props,
      content: fragmentToString(props.content),
    }))
  }

  static reduceHeadingTitles(sections, element) {
    return TitleParser.reduceTitles(sections, element, element, 'H1')
  }

  static reduceBoldTitles(sections, element) {
    const hasTextNodes = Array.from(element.childNodes).some(child => (
        child.nodeName === '#text' && !isEmptyOrWhitespace(child)
    ))
    const onlyChild = !hasTextNodes && element.children.length === 1 && element.children[0]
    return TitleParser.reduceTitles(sections, element, onlyChild, 'STRONG')
  }

  static reduceTitles(sections, element, titleEl, titleTag) {
    const lastSection = sections[sections.length - 1]

    if (titleEl && titleEl.nodeName === titleTag) {
      if (!isEmptyOrWhitespace(titleEl)) {
        sections.push({
          title: titleEl.textContent.trim(),
          content: document.createDocumentFragment(),
        })
      }
    } else if (lastSection && !isEmptyOrWhitespace(element)) {
      lastSection.content.appendChild(element)
    }
    return sections
  }
}

export default TitleParser
