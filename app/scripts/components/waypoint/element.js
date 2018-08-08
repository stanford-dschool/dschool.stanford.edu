import React from 'react'
import WayPointController from './index'

class WayPointElement extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    triggerElement: React.PropTypes.any,
    until: React.PropTypes.any,
  }

  componentDidMount() {
    const { triggerElement } = this.props
    this.controller = new WayPointController(this.node, { triggerElement })
  }

  componentDidUpdate(prevProps) {
    const { triggerElement } = this.props
    if (triggerElement !== prevProps.triggerElement) {
      this.controller.setTrigger(triggerElement)
    }
  }

  render() {
    const { children } = this.props
    return <span ref={n => { this.node = n }}>{children}</span>
  }
}

export default WayPointElement
