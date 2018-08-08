import React from 'react'

class QuarterSelector extends React.Component {
  static propTypes = {
    classes: React.PropTypes.arrayOf(React.PropTypes.object),
    elements: React.PropTypes.object,
    attr: React.PropTypes.string,
    defaultQuarter: React.PropTypes.string,
    quarters: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  constructor(props) {
    super(props)
    this.state = {
      quarter: props.defaultQuarter,
      previous: false,
      next: this.ifNext(),
    }
    this.updateQuarter(this.state.quarter)
  }

  // update with selected quarter info
  updateText(quarter) {
    const props = this.props
    const qtr = props.quarters.find(element => element.quarter === quarter)
    const newInfo = document.createElement('div')
    qtr.tagline.classList.add('t-tag')
    newInfo.appendChild(qtr.tagline)
    newInfo.appendChild(qtr.name)
    newInfo.appendChild(qtr.info)

    props.elements.info.innerHTML = newInfo.innerHTML
    props.elements.bg.innerHTML = qtr.name.textContent
    props.elements.info.classList.remove('u-hide')
  }

  // show classes tagged with selected quarter
  updateClasses(quarter) {
    const props = this.props
    props.classes.forEach(element => {
      const elmQtr = element.getAttribute(props.attr)
      if (elmQtr.indexOf(quarter) > -1) {
        element.classList.remove('u-hide')
      } else {
        element.classList.add('u-hide')
      }
    })
  }

  // update both text and classes
  updateQuarter(quarter) {
    this.updateText(quarter)
    this.updateClasses(quarter)
  }

  // change state and update page when an arrow is clicked
  changeQuarter(event, direction, enabled) {
    if (enabled) {
      if (direction === 'prev') {
        if (this.state.quarter === 'quarter-next') {
          this.setState({
            quarter: 'quarter-current',
            prev: false,
            next: true,
          }, () => this.updateQuarter(this.state.quarter))
        } else {
          this.setState({
            quarter: 'quarter-next',
            prev: true,
            next: true,
          }, () => this.updateQuarter(this.state.quarter))
        }
      } else if (this.state.quarter === 'quarter-current') {
        this.setState({
          quarter: 'quarter-next',
          prev: true,
          next: this.ifNext(),
        }, () => this.updateQuarter(this.state.quarter))
      } else {
        this.setState({
          quarter: 'quarter-after-next',
          prev: true,
          next: false,
        }, () => this.updateQuarter(this.state.quarter))
      }
    }
  }

  // check if there are any classes tagged with the next quarter
  ifNext() {
    const props = this.props
    const nextQtr = (!this.state) ? 'quarter-next' : 'quarter-after-next'
    let result = false

    props.classes.forEach(element => {
      const elmQtrs = element.getAttribute(props.attr)
      if (elmQtrs.indexOf(nextQtr) > -1) {
        result = true
        return
      }
    })

    return result
  }

  render() {
    return (
      <div>
        <div className={this.state.prev ? 'QuarterFilter-selector--prev' : 'QuarterFilter-selector--prev disabled'} onClick={e => this.changeQuarter(e, 'prev', this.state.prev)} />
        <div className={this.state.next ? 'QuarterFilter-selector--next' : 'QuarterFilter-selector--next disabled'} onClick={e => this.changeQuarter(e, 'next', this.state.next)} />
      </div>
    )
  }
}

export default QuarterSelector
