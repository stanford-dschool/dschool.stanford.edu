import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class GalleryEnhancement extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    descriptions: PropTypes.arrayOf(PropTypes.object),
  }
  state = {
    currentIndex: 0,
  }

  onLeft = () => {
    const { currentIndex } = this.state
    if (currentIndex === 0) {
      return
    }
    this.setState({
      currentIndex: Math.max(0, currentIndex - 1),
    })
  }

  onRight = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.min(this.props.images.length - 1, currentIndex + 1),
    }))
  }

  goToSlide = currentIndex => () => {
    this.setState({ currentIndex })
  }

  handleKeys = (e) => {
    if (e.key === 'ArrowRight') {
      this.onRight()
    } else if (e.key === 'ArrowLeft') {
      this.onLeft()
    }
  }


  render() {
    const { images, descriptions } = this.props
    const { currentIndex } = this.state
    const noMoreOnLeft = currentIndex === 0
    const noMoreOnRight = currentIndex === images.length - 1
    const translateX = currentIndex * -243

    return (
      <div className="Gallery">
        <div className="Gallery-main">
          {images.map((image, index) =>
            <div
              className={classNames('Gallery-item')}
              aria-hidden={index !== currentIndex}
              key={index}
            >
              <div
                className="Gallery-mainImage"
                style={{ backgroundImage: `url(${image.getAttribute('data-src')})` }}
              />
              <div className="Gallery-description">
                <p dangerouslySetInnerHTML={{ __html: descriptions[index].innerHTML }} />
              </div>
            </div>
          )}
        </div>
        <div className="Gallery-arrows">
          <button
            className="Gallery-arrow"
            onClick={this.onLeft}
            disabled={noMoreOnLeft}
          />
          <button
            className="Gallery-arrow"
            onClick={this.onRight}
            disabled={noMoreOnRight}
          />
        </div>
        <div
          className="Gallery-thumbs"
          tabIndex="0"
          onKeyUp={this.handleKeys}
          style={{ width: images.length * 243, transform: `translateX(${translateX}px)` }}
        >
          {images.map((image, index) =>
            <div
              key={index}
              className={classNames('Gallery-thumb', index === currentIndex && 'is-active')}
              style={{ backgroundImage: `url(${image.getAttribute('data-src')})` }}
              onClick={this.goToSlide(index)}
            />
          )}
        </div>
      </div>
    )
  }
}

export default GalleryEnhancement
