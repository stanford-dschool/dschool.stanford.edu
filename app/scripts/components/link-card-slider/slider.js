import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class Slider extends Component {
  static width = 640
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    currentIndex: 0,
  }

  onLeft = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.max(0, currentIndex - 1),
    }))
  }

  onRight = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.min(this.props.cards.length - 1, currentIndex + 1),
    }))
  }

  onDotClick = currentIndex => () => {
    this.setState({ currentIndex })
  }

  render() {
    const { cards } = this.props
    const { currentIndex } = this.state
    const noMoreOnLeft = currentIndex === 0
    const noMoreOnRight = currentIndex === cards.length - 1
    const singlePage = noMoreOnLeft && noMoreOnRight
    return (
      <div className="LinkCardSlider-wrap">
        <ul className="LinkCardSlider-tray">
          {cards.map((card, index) =>
            <li
              key={index}
              className="LinkCard"
              dangerouslySetInnerHTML={{ __html: card.innerHTML }}
              style={{ transform: `translateX(-${Slider.width * currentIndex}px)` }}
            />
          )}
        </ul>
        {!singlePage && (
          <div className="LinkCardSlider-controls">
            <ul className="LinkCardSlider-dots">
              {cards.map((card, index) =>
                <li
                  key={index}
                  onClick={this.onDotClick(index)}
                  className={classNames('LinkCardSlider-dot', index === currentIndex && 'is-active')}
                />
              )}
            </ul>
            <div className="LinkCardSlider-arrows">
              <button aria-label="previous" onClick={this.onLeft} aria-disabled={noMoreOnLeft} className="LinkCardSlider-arrow" />
              <button aria-label="next" onClick={this.onRight} aria-disabled={noMoreOnRight} className="LinkCardSlider-arrow" />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Slider
