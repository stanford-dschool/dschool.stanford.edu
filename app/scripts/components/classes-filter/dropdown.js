import React from 'react'
import classNames from 'classnames'

/**
* classes sorting order:
* 1. Active Core and Booster
* 2. Active Pop-out
* 3. All not active
**/
class Dropdown extends React.Component {
  static classTypes = {
    core: 5,
    boost: 5,
    'pop-out': 1,
  }

  static propTypes = {
    classes: React.PropTypes.array,
    classListElement: React.PropTypes.object,
    activeCss: React.PropTypes.string,
    label: React.PropTypes.string,
    default: React.PropTypes.object,
    options: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  constructor(props) {
    super(props)
    const savedOption = JSON.parse(sessionStorage.getItem(props.label))
    if (savedOption) {
      this.state = {
        activeOption: savedOption.displayName,
        active: false,
      }
      this.updatedClasses(savedOption)
    } else {
      this.state = {
        activeOption: props.default.displayName,
        active: false,
      }
      this.updatedClasses(props.default)
    }

    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
  }

  onSelection(event, option) {
    const props = this.props
    if (option.displayName === this.state.activeOption) {
      sessionStorage.removeItem(props.label)
      this.setState({
        activeOption: props.default.displayName,
        active: false,
      })
      this.updatedClasses(props.default)
    } else if (option.showAll) {
      sessionStorage.setItem(props.label, JSON.stringify(option))
      this.setState({
        activeOption: option.displayName,
        active: false,
      })
      this.updatedClasses()
    } else {
      sessionStorage.setItem(props.label, JSON.stringify(option))
      this.setState({
        activeOption: option.displayName,
        active: false,
      })
      this.updatedClasses(option)
    }
  }

  getClassType(element) {
    return element.getAttribute('data-type').toLowerCase()
  }

  /**
  * @param DOM element
  * checks if the class card is active
  */
  isActive(element) {
    return element.classList.contains('is-active-type') &&
        element.classList.contains('is-active-requirements') &&
        element.classList.contains('is-active-days') &&
        element.classList.contains('is-active-quarter')
  }

  calculateWeight(element) {
    let weight = Dropdown.classTypes[this.getClassType(element)] ? Dropdown.classTypes[this.getClassType(element)] : 0

    if (this.isActive(element)) {
      weight *= 10
    }

    weight += ((100 - element.dataset.index) / 100)

    return weight
  }

  sortClasses(classes) {
    const index = new Map(classes.map((item, i) => [item, i]))

    return classes.sort((item1, item2) => {
      const diff = item2.getAttribute('data-weight') - item1.getAttribute('data-weight')
      if (diff !== 0) return diff
      return index.get(item1) - index.get(item2)
    })
  }

  updatedClasses(option) {
    const props = this.props
    if (typeof option === 'undefined' || option.showAll || !option.attr) {
      props.classes.forEach(element => {
        const anchorTag = element.querySelector('a')
        anchorTag.setAttribute('tabindex', 0)
        element.classList.add(props.activeCss)
        element.setAttribute('data-weight', this.calculateWeight(element))
      })
      this.showClasses(this.sortClasses(props.classes))
    } else {
      props.classes.forEach(element => {
        const anchorTag = element.querySelector('a')
        const attr = element.getAttribute(option.attr)
        if (attr && (option.attrValue ? (attr.indexOf(option.attrValue) > -1) : true)) {
          anchorTag.setAttribute('tabindex', 0)
          element.classList.add(props.activeCss)
        } else {
          anchorTag.setAttribute('tabindex', -1)
          element.classList.remove(props.activeCss)
        }
        element.setAttribute('data-weight', this.calculateWeight(element))
      })
      this.showClasses(this.sortClasses(props.classes))
    }
  }

  /**
  * inject classs items to classListElement
  */
  showClasses(classElements) {
    const props = this.props
    classElements.forEach(item => {
      props.classListElement.appendChild(item)
    })
  }

  hide() {
    this.setState({
      active: false,
    })

    document.removeEventListener('click', this.hide)
  }

  show() {
    this.setState({
      active: true,
    })

    document.addEventListener('click', this.hide)
  }

  render() {
    const { label, options } = this.props
    return (
      <div className="Grid-cell u-offset1 p-Classes-filterUnits">
        <div className={this.state.active ? 'FilterOption is-active' : 'FilterOption'}>
          <div className="FilterOption-label t-tag">{label}</div>
          <div tabIndex="0" className="FilterOption-select t-monospaced" onKeyPress={this.state.active ? this.hide : this.show} onClick={this.state.active ? this.hide : this.show}>
            <span className="FilterOption-default">{this.state.activeOption}</span>
            <ul className="FilterOption-dropdown">
              {options.map(option =>
                <li
                  tabIndex={this.state.active ? '0' : '-1'}
                  key={option.displayName}
                  className={classNames(
                    'FilterOption-dropdownItem',
                    this.state.activeOption === option.displayName && 'is-active'
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
    )
  }
}

export default Dropdown
