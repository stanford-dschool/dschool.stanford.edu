import React from 'react'

const NextButton = ({ onClick }) => (
  <button
    className="Slideshow-nextButton"
    onClick={onClick}
  >
    <span className="DirectionalArrow DirectionalArrow--right" />
  </button>
)

NextButton.propTypes = {
  onClick: React.PropTypes.func,
}

export default NextButton
