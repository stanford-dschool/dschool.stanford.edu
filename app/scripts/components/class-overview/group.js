import React from 'react'

class Group extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired,
    onMounted: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.onMounted(this.root)
  }

  render() {
    const { id, data } = this.props
    return (
      <section
        className="p-ClassGroup"
        id={id}
        ref={root => { this.root = root }}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    )
  }
}

export default Group
