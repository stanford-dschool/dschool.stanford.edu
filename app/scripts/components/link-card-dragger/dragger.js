import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class Dragger extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    min: PropTypes.number,
    max: PropTypes.number,
    state: PropTypes.number,
  }
  state = {
    value: this.props.state,
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { cards } = this.props
    const { value } = this.state
    return (
      <div className="LinkCardDragger-wrap">
        <ul className="LinkCardDragger-tray">
          {cards.map((card, index) =>
            <li
              key={index}
              className={classNames('LinkCard', 'LinkCard--vertical', index < value && 'is-transparent')}
              dangerouslySetInnerHTML={{ __html: card.innerHTML }}
              style={{ transform: `translateX(-${100 * value}%)` }}
            />
          )}
        </ul>
        {cards.length > 2 && (
          <div className="LinkCardDragger-area">
            <span className="LinkCardDragger-caption">Past</span>
            <div className="LinkCardDragger-controlWrap">
              <input
                className="LinkCardDragger-control"
                type="range"
                value={value}
                aria-valuenow={value}
                aria-valuetext={`News item ${value}`}
                onChange={this.handleChange}
                max={cards.length - 1}
              />
            </div>
            <span className="LinkCardDragger-caption">Future</span>
          </div>
        )}
      </div>
    )
  }
}

export default Dragger
