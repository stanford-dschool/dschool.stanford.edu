import { isEmptyOrWhitespace, fragmentToString } from '../utilities'

class CTAParser {
  /**
   * Parses structured CTAs from the wysiwyg node.
   *
   * @param {Element} root
   * @param {boolean} checkTag
   * @return {object[]} parsed CTAs.
   */
  static parse(root, checkTag) {
    const nodes = Array.from(root.children)
    const reducer = checkTag ? CTAParser.reduceWithTag : CTAParser.reduceWithoutTag

    return nodes.reduce(reducer, []).map(cta => ({
      ...cta,
      content: fragmentToString(cta.content),
    }))
  }

  static reduceWithTag(steps, node) {
    return CTAParser.reduceNode(steps, node, true)
  }

  static reduceWithoutTag(steps, node) {
    return CTAParser.reduceNode(steps, node)
  }

  static reduceNode(steps, node, checkTag) {
    const hasTextNodes = Array.from(node.childNodes).every(child => (
        child.nodeName === '#text' && !isEmptyOrWhitespace(child)
    ))
    const onlyChild = !hasTextNodes && node.children.length === 1 && node.children[0]
    const lastStep = steps[steps.length - 1]

    if (onlyChild && onlyChild.nodeName === 'STRONG') {
      steps.push({
        title: node.textContent,
        content: document.createDocumentFragment(),
      })
    } else if (checkTag && lastStep && onlyChild && onlyChild.nodeName === 'EM') {
      if (!steps[steps.length - 1].tag) {
        lastStep.tag = onlyChild.textContent
      } else {
        lastStep.content.appendChild(node)
      }
    } else if (lastStep && onlyChild && onlyChild.nodeName === 'A') {
      steps[steps.length - 1].cta = {
        href: onlyChild.href,
        label: onlyChild.textContent,
      }
    } else if (lastStep) {
      lastStep.content.appendChild(node)
    }
    return steps
  }
}

export default CTAParser
