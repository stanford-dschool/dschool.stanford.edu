import React from 'react'
import classNames from 'classnames'

class Dropdown extends React.Component {
  componentWillMount() {
    this.headerFilter = document.querySelector('[data-header-filter]')
    this.audienceList = this.headerFilter.querySelector('ul')
    this.audienceOptions = this.processList(Array.from(this.audienceList.querySelectorAll('li')))
    if (this.audienceOptions.length > 0) {
      this.setState({ active: false, activeOption: this.audienceOptions[0] })
    }
  }


  componentDidMount() {
    this.audienceList.classList.add('is-hidden')
    this.headerFilter.classList.remove('is-hidden')
  }

  processList(audienceListHTML) {
    return audienceListHTML.map(item => item.innerHTML)
  }

  /**
  * expand search overlay
  */
  onClick = (event) => {
    event.preventDefault()
    const searchOverlay = document.querySelector('[data-search]')
    const e = new CustomEvent('filter', {
      detail: { query: this.state.activeOption },
    })
    document.dispatchEvent(e)
    setTimeout(() => {
      searchOverlay.classList.add('is-expanded')
      document.documentElement.classList.add('u-noScroll', 'modal-is-open')
    }, 400)
  }

  onSelection = (event, option) => {
    this.setState({
      active: false,
      activeOption: option,
    })
  }

  hide = () => {
    this.setState({
      active: false,
    })

    document.removeEventListener('click', this.hide)
  }

  show = () => {
    this.setState({
      active: true,
    })

    document.addEventListener('click', this.hide)
  }

  render() {
    return (
      <div className="Grid-cell Header-dropdown">
        <div className={this.state.active ? 'FilterOption is-active' : 'FilterOption'}>
          <div tabIndex="0" className="FilterOption-select t-monospaced" onKeyPress={this.state.active ? this.hide : this.show} onClick={this.state.active ? this.hide : this.show}>
            <span className="FilterOption-default">{this.state.activeOption}</span>
            <ul className="FilterOption-dropdown">
              {this.audienceOptions.map(option =>
                <li
                  tabIndex={this.state.active ? '0' : '-1'}
                  key={option}
                  className={classNames(
                    'FilterOption-dropdownItem',
                    this.state.activeOption === option && 'is-active'
                  )}
                  onClick={e => this.onSelection(e, option)}
                  onKeyPress={e => this.onSelection(e, option)}
                >
                  {option}
                </li>
              )}
            </ul>
          </div>
        </div>

        <a href="" onClick={this.onClick} className="Header-button--filter CtaButton">
          Go
          <span className="CtaButton-arrow DirectionalArrow DirectionalArrow--right" />
        </a>
      </div>
    )
  }
}

export default Dropdown
