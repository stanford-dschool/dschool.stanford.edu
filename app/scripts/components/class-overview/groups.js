import React from 'react'
import Group from './group'
import Nav from './group-nav'

class Groups extends React.Component {
  static propTypes = {
    groups: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onMounted = (props) => (target) => {
    this.nav.setGroupTarget(target, props)
  }

  render() {
    const { groups } = this.props
    return (
      <div>
        <Nav groups={groups} ref={nav => { this.nav = nav }} />
        <div className="Grid-cell u-sm-size10 u-sm-offset4">
          {groups.map(groupProps =>
            <Group key={groupProps.id} onMounted={this.onMounted(groupProps)} {...groupProps} />
          )}
        </div>
      </div>
    )
  }
}

export default Groups
