import React from 'react'

const frameTypes = ['t', 'r', 'b', 'l']

const Frame = ({
  className = '',
}) => {
  const type = Math.floor(Math.random() * 4)
  const sideClasses = ['', '', '', '']
  const sideComponents = ['', '', '', '']
  const typeClass = frameTypes[type]
  sideClasses[type] = 'Frame-side--break'
  sideComponents[type] = '<div class="Frame-sidePart Frame-sidePart-first"></div><div class="Frame-sidePart Frame-sidePart-last"></div>'
  return (
    <div className={`Frame Frame--${typeClass} ${className}`}>
      <div className={`Frame-side Frame-side--top ${sideClasses[0]}`} dangerouslySetInnerHTML={{ __html: sideComponents[0] }} />
      <div className={`Frame-side Frame-side--right ${sideClasses[1]}`} dangerouslySetInnerHTML={{ __html: sideComponents[1] }} />
      <div className={`Frame-side Frame-side--bottom ${sideClasses[2]}`} dangerouslySetInnerHTML={{ __html: sideComponents[2] }} />
      <div className={`Frame-side Frame-side--left ${sideClasses[3]}`} dangerouslySetInnerHTML={{ __html: sideComponents[3] }} />
    </div>
  )
}

Frame.propTypes = {
  className: React.PropTypes.string,
}

export default Frame
