import React, { Component, PropTypes } from 'react'
import Ticker from './ticker'
import TextOverlay from './textoverlay'
import NextButton from './nextbutton'

class Slideshow extends Component {
  static imageFolder = '/assets/'
  static delayInMilliseconds = 6000
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    currentIndex: 0,
    random: this.props.slides.map(() => ({
      x: Math.floor(Math.random() * -6),
      y: Math.floor(Math.random() * 3) - 1.5,
    })),
  }

  componentDidMount() {
    this.scheduleTick()
  }

  onNext = () => {
    this.scheduleTick()
    this.setState((state, props) => ({
      currentIndex: (state.currentIndex + 1) % props.slides.length,
    }))
  }

  onDotClick = currentIndex => () => {
    this.scheduleTick()
    this.setState({ currentIndex })
  }

  scheduleTick() {
    clearTimeout(this.rotateTimer)
    this.rotateTimer = setTimeout(this.onNext, Slideshow.delayInMilliseconds)
  }

  render() {
    const { slides } = this.props
    const { currentIndex, random } = this.state
    const currentSlide = slides[currentIndex]
    return (
      <div className="Slideshow">
        <NextButton onClick={this.onNext} />
        <ul className="Slideshow-slidesWrapper">
          {slides.map((slide, index) => {
            const slideName = slide.image
            const { x, y } = random[index]
            const isActive = index === currentIndex
            return (
              <li
                key={index}
                className={`Slideshow-slide ${isActive && 'is-active'}`}
                onClick={this.onDotClick(index)}
                style={{
                  backgroundImage: `url(${Slideshow.imageFolder}${slideName})`,
                  transform: `translate(${x}em, ${y}em)`,
                }}
              />
            )
          })}
        </ul>
        <TextOverlay {...currentSlide} />
        <div className="Slideshow-tickerWrapper" aria-hidden="true">
          {slides.map((slide, index) => (
            <Ticker
              key={index}
              isActive={index === currentIndex}
              onClick={this.onDotClick(index)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Slideshow
