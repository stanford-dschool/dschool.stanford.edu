import React from 'react'
import Affix from '../affix'
import WayPoint from '../waypoint/element'
import ScrollTo from '../scroll-to/element'

const groupIcons = {
  'core-classes': 'circle',
  'pop-up-classes': 'triangle',
  'boost-classes': 'square',
}

class GroupNav extends React.Component {
  static propTypes = {
    groups: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
      })
    ),
  }

  constructor(props) {
    super(props)
    this.state = {
      targetMap: {},
    }
  }

  componentDidMount() {
    this.affix = new Affix(this.affixWrap, {
      offset: 20/* pixels */,
      offsetParent: '[data-class-overview]',
    })
  }

  setGroupTarget(target, props) {
    const { targetMap } = this.state
    targetMap[props.id] = target
    this.setState({ targetMap })
  }

  render() {
    return (
      <nav className="p-ClassTypes Grid-cell u-md-size2 u-md-offset2">
        <div ref={component => { this.affixWrap = component }}>
          <h2 className="t-tag">Class types</h2>
          <div className="p-ClassTypes-links">
            {this.props.groups.map(group => (
              <WayPoint key={group.id} triggerElement={this.state.targetMap[group.id]}>
                <ScrollTo className="p-ClassType" section={`#${group.id}`}>
                  <img
                    role="presentation"
                    className="p-ClassType-img"
                    src={`/assets/${groupIcons[group.id]}-small.svg`}
                  />
                  {group.name.replace(/\s*Classes$/ig, '')}
                </ScrollTo>
              </WayPoint>
            ))}
          </div>
        </div>
      </nav>
    )
  }
}

export default GroupNav
