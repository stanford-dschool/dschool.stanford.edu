import React, { Component } from 'react'
import Frame from '../frame'
import FrameEnhance from '../frame-enhance'

class FloatingImage extends Component {
  static propTypes = {
    image: React.PropTypes.string.isRequired,
    focalPoint: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
    }),
    type: React.PropTypes.oneOf([
      'tall',
      'square',
      'wide',
    ]),
  }

  static defaultProps = {
    focalPoint: { x: 50, y: 50 },
  }

  componentDidMount() {
    FrameEnhance.init()
  }

  render() {
    const { image, focalPoint, type } = this.props
    return (
      <div className={`Photo Photo--${type}`}>
        <div
          data-parallax
          className="Photo-img"
          style={{
            backgroundImage: `url(${image}?format=1500w)`,
            backgroundPosition: `${focalPoint.x}% ${focalPoint.y}%`,
          }}
        />
        <Frame />
      </div>
    )
  }
}

export default FloatingImage
