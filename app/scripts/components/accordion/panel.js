import React from 'react'
import classNames from 'classnames'

class Panel extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool,
  }

  state = {
    isAnimating: false,
    maxHeight: '',
  }

  componentWillReceiveProps({ isOpen }) {
    if (this.props.isOpen !== isOpen) {
      // Prepare the animation by setting the current height as max height.
      this.setState({ maxHeight: `${this.panel.offsetHeight}px` }, () => {
        // Set a transition after specifying the starting point (height)
        // of the animation. No forcing of layout is needed since this
        // happens on the next animation frame.

        // This is for fixing a Safari animation bug, I have no idea why this works
        const temp = this.tab.offsetHeight
        this.setState({ isAnimating: true }, () => {
          // Calculate the height of the panel at the end state.
          const contentHeight = isOpen ? this.content.offsetHeight : 0 * temp
          this.setState({ maxHeight: `${this.tab.offsetHeight + contentHeight}px` })
        })
      })
    }
  }

  onToggle = () => {
    if (!this.state.isAnimating) {
      this.props.onToggle(this.props.title)
    }
  }

  onTransitionEnd = event => {
    // Make sure that we don't respond to child transitions
    // and cancel prematurely.
    if (event.target === this.panel) {
      this.setState({ isAnimating: false, maxHeight: '' })
    }
  }

  render() {
    const { title, content, isOpen } = this.props
    const { isAnimating, maxHeight } = this.state

    return (
      <div
        aria-expanded={isOpen}
        className={classNames('Accordion-panel', isAnimating && 'is-animating')}
        ref={c => { this.panel = c }}
        onTransitionEnd={this.onTransitionEnd}
        role="tabpanel"
        style={{ maxHeight }}
      >
        <div className="Accordion-wrapper">
          <h2
            className="Accordion-tab"
            onClick={this.onToggle}
            onKeyPress={this.onToggle}
            ref={c => { this.tab = c }}
          >
            <span
              className="Accordion-title"
              role="tab"
              tabIndex="0"
            >
              {title}
            </span>
            <i className={classNames('AccordionPlus', isOpen && 'is-active')} />
          </h2>
          <div
            ref={c => { this.content = c }}
            className={classNames('Accordion-content', (isAnimating || isOpen) || 'is-hidden')}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    )
  }
}

export default Panel
