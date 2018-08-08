import React from 'react'

class Checkbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    name: React.PropTypes.string,
  }

  state = {
    checked: this.props.checked,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checked: nextProps.checked })
  }

  onChange() {
    this.setState({ checked: this.props.checked })
  }

  isChecked() {
    return this.state.checked
  }

  render() {
    const { name, className } = this.props
    return (
      <input
        name={name}
        className={className}
        type="checkbox"
        checked={this.state.checked}
        onChange={this.onChange}
      />
    )
  }
}


export default Checkbox
