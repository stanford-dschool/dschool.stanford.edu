import React from 'react'

const TextOverlay = ({ title, description }) => (
  <div className="Slideshow-textOverlay">
    <h1 className="Slideshow-textTitle">
      {title}
    </h1>
    <p className="Slideshow-textSubtitle">
      {description}
    </p>
  </div>
)

TextOverlay.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
}

export default TextOverlay
