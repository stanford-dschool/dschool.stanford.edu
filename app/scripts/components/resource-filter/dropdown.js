import React from 'react'
import classNames from 'classnames'

class Dropdown extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    activeCss: React.PropTypes.string,
    label: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.object),
    activeOption: React.PropTypes.object,
    onSelection: React.PropTypes.func,
  }

  constructor(props) {
    super(props)

    props.onSelection(props.id, props.options[0])
    this.state = { active: false }

    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
  }

  onSelection(event, option) {
    const props = this.props
    if (option.displayName === props.activeOption.displayName) {
      props.onSelection(props.id, props.options[0])
      this.setState({ active: false })
    } else if (option.showAll) {
      props.onSelection(props.id, option)
      this.setState({ active: false })
    } else {
      props.onSelection(props.id, option)
      this.setState({ active: false })
    }
  }

  hide() {
    this.setState({ active: false })
    document.removeEventListener('click', this.hide)
  }

  show() {
    this.setState({ active: true })
    document.addEventListener('click', this.hide)
  }

  render() {
    const { label, options, activeOption, id } = this.props
    return (
      <div className={`p-Filters p-Filters--${id}`}>
        <div className="Grid-cell">
          <div className={this.state.active ? 'FilterOption is-active' : 'FilterOption'}>
            <div className="FilterOption-label t-tag">{label}</div>
            <div tabIndex="0" className="FilterOption-select t-monospaced" onKeyPress={this.state.active ? this.hide : this.show} onClick={this.state.active ? this.hide : this.show}>
              <span className="FilterOption-default">{activeOption.displayName}</span>
              <ul className="FilterOption-dropdown">
                {options.map(option =>
                  <li
                    tabIndex={this.state.active ? '0' : '-1'}
                    key={option.displayName}
                    className={classNames(
                      'FilterOption-dropdownItem',
                      activeOption.displayName === option.displayName && 'is-active'
                    )}
                    onClick={e => this.onSelection(e, option)}
                    onKeyPress={e => this.onSelection(e, option)}
                  >
                    {option.displayName}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dropdown
