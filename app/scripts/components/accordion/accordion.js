import React from 'react'
import classNames from 'classnames'
import Panel from './panel'

class Accordion extends React.Component {
  static propTypes = {
    large: React.PropTypes.bool,
    panels: React.PropTypes.array,
  }

  state = {
    openPanels: {},
  }

  onToggle = (panel) => {
    this.setState(({ openPanels }) => {
      openPanels[panel] = !openPanels[panel]
      return { openPanels }
    })
  }

  render() {
    const { panels, large } = this.props
    const { openPanels } = this.state
    return (
      <aside className={classNames('Accordion', large && 'Accordion--large')}>
        {panels.map(({ title, content }) =>
          <Panel
            key={title}
            isOpen={openPanels[title]}
            title={title}
            content={content}
            onToggle={this.onToggle}
          />
        )}
      </aside>
    )
  }
}

export default Accordion
