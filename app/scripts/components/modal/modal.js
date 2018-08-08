import React from 'react'

class Modal extends React.Component {
  static propTypes = {
    team: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }

  state = {
    currentIndex: this.props.index,
  }

  componentDidMount() {
    this.modal.focus()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.setState({ currentIndex: nextProps.index })
    }
  }

  onLeft = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.max(0, currentIndex - 1),
    }))
  }

  onRight = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.min(this.props.team.length - 1, currentIndex + 1),
    }))
  }

  handleKeys = (e) => {
    if (e.key === 'ArrowRight') {
      this.onRight()
    } else if (e.key === 'ArrowLeft') {
      this.onLeft()
    } else if (e.key === 'Escape') {
      this.props.onClose()
    }
  }

  render() {
    const { currentIndex } = this.state
    const { team, onClose } = this.props
    const length = team.length
    const person = team[currentIndex]
    const noMoreOnLeft = currentIndex === 0
    const noMoreOnRight = currentIndex === length - 1
    return (
      <div>
        <div className="Modal-backdrop" onClick={onClose} />
        <section
          className="Modal-content"
          tabIndex="0"
          onKeyUp={this.handleKeys}
          ref={(modal) => { this.modal = modal }}
        >
          <button onClick={onClose} className="Modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path fill="#f24034" d="M0.1,2.928L2.929,0.1,19.9,17.071,17.071,19.9Z" />
              <path fill="#f24034" d="M17.071,0.1L19.9,2.928,2.929,19.9,0.1,17.071Z" />
            </svg>
          </button>
          <div className="Modal-line Modal-line--top" />
          <div className="Modal-line Modal-line--right" />
          <div className="Modal-line Modal-line--bottom" />
          <div className="Modal-line Modal-line--left" />
          <div className="Modal-buttons">
            <button
              disabled={noMoreOnRight}
              onClick={this.onRight}
              className="Modal-button Modal-button--right"
            >
              &gt;
            </button>
            <button
              disabled={noMoreOnLeft}
              onClick={this.onLeft}
              className="Modal-button Modal-button--left"
            >
              &lt;
            </button>
          </div>
          <div className="Modal-aside">
            <div
              className="TeamMemberModal-image"
              style={{ backgroundImage: `url('${person.image}')` }}
            />
            {person.links.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="TeamMemberModal-bioLink"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="Modal-main">
            <p className="TeamMemberModal-bioName">
              {person.name}
            </p>
            <p className="TeamMemberModal-bioTitle">
              {person.title}
            </p>
            <div className="TeamMemberModal-bioText">
              {person.text1 &&
                <h2>What I do</h2>
              }
              <p dangerouslySetInnerHTML={{ __html: person.text1 }} />
              {person.text2 &&
                <h2>Also</h2>
              }
              <p dangerouslySetInnerHTML={{ __html: person.text2 }} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Modal
