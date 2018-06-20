import React from 'react'
import scroll from './index'


const ScrollTo = ({ section, children, ...props }) => (
  <a
    {...props}
    href={section}
    onClick={(event) => {
      event.preventDefault()
      scroll.to(document.querySelector(section))
    }}
  >{children}</a>
)

ScrollTo.propTypes = {
  section: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
}

export default ScrollTo
