import React, { Component } from 'react'
import axios from 'axios'
// import React, { Component, PropTypes } from 'react'
// import classNames from 'classnames'

class StorySlider extends Component {
  state = {
    items: [],
    currentItem: 0,
    previousItem: 2,
    unusedItem: 1,
    newLeft: 2,
    newRight: 1,
  }

  componentDidMount() {
    axios.get('/field-notes?format=json')
      .then(res => {
        const collections = res.data.collection.collections
        this.setState({ items: collections.slice(0, 3) })
      })
  }

  previousSlide = () => {
    const oldItem = this.state.currentItem
    let newItem = this.state.currentItem + 1
    let otherItem = this.state.currentItem - 1
    if (newItem > 2) newItem = 0
    if (otherItem < 0) otherItem = 2
    this.setState({
      currentItem: newItem,
      previousItem: oldItem,
      unusedItem: otherItem,
      newLeft: oldItem,
      newRight: otherItem,
    })
  }

  nextSlide = () => {
    const oldItem = this.state.currentItem
    let newItem = this.state.currentItem - 1
    let otherItem = this.state.currentItem + 1
    if (newItem < 0) newItem = 2
    if (otherItem > 2) otherItem = 0
    this.setState({
      currentItem: newItem,
      previousItem: oldItem,
      unusedItem: otherItem,
      newLeft: otherItem,
      newRight: oldItem,
    })
  }

  render() {
    const { items, currentItem, previousItem, unusedItem, newLeft, newRight } = this.state
    const styles = [{}, {}, {}]
    styles[currentItem].transform = 'translateX(0)'
    styles[newLeft].transform = 'translateX(-100%)'
    styles[newRight].transform = 'translateX(100%)'
    styles[currentItem].opacity = 1
    styles[previousItem].opacity = 1
    styles[unusedItem].opacity = 0
    return (
      <div className="Story-slider">
        <button onClick={this.previousSlide} className="Story-sliderPrev">
          <i className="DirectionalArrow DirectionalArrow--left p-DirectionalArrow" />
        </button>
        <button onClick={this.nextSlide} className="Story-sliderNext">
          <i className="DirectionalArrow DirectionalArrow--right p-DirectionalArrow" />
        </button>
        <div className="Story-sliderBlock">
          {items.map((item, index) => {
            const src = item.mainImage.assetUrl
            const title = item.title
            const key = item.id
            const url = item.fullUrl
            return (
              <a href={url} className="Story-sliderSlide" key={key} style={styles[index]}>
                <img className="Story-sliderImage" src={src} role="presentation" />
                <div className="Story-sliderCard">
                  <p className="Story-sliderText">{title}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    )
  }
}

export default StorySlider
