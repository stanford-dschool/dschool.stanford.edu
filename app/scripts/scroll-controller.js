import { Controller } from 'scrollmagic'

const controller = new Controller()

// Disable in mobile view
function handleResize(isMobile) {
  controller.enabled(!isMobile.matches)
}

const mobileMaxWidth = 749 // px
const mq = window.matchMedia(`(max-width: ${mobileMaxWidth}px)`)

mq.addListener(handleResize)
handleResize(mq)

export default controller
