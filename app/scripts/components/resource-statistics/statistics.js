import React from 'react'
import { safeFetch } from '../../utilities'

class Statistics extends React.Component {
  static propTypes = {
    collectionId: React.PropTypes.string.isRequired,
  }

  state = {
    labels: {},
    resources: [],
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate({ collectionId }) {
    if (collectionId !== this.props.collectionId) {
      this.getData()
    }
  }

  async getData() {
    const { error, empty, items: resources } = (await safeFetch(this.urlSrc)) || []
    if (error || empty) { return }
    const labels = resources.reduce((counter, item) => {
      item.tags.forEach(tag => {
        const match = tag.match(/Type: (.+)/)
        if (match) {
          counter[match[1]] = (counter[match[1]] || 0) + 1
        }
      })
      return counter
    }, {})
    this.setState({ labels, resources })
  }

  get urlSrc() {
    const id = encodeURIComponent(this.props.collectionId)
    return `${window.location.origin}/resources/?format=json&category=${id}`
  }

  get urlDisplay() {
    const id = encodeURIComponent(this.props.collectionId)
    return `${window.location.origin}/resources/?category=${id}`
  }

  render() {
    const { labels, resources } = this.state
    if (resources.length < 1) {
      return null
    }
    const latest = resources.length && resources[0]
    return (
      <aside className="HeyHowdy">
        <h2 className="t-small">{resources.length} Resources</h2>
        {Object.keys(labels).map(label => (
          <p key={label}><span>{labels[label]} {label}</span></p>
        ))}
        {latest && (
          <span>
            <h2 className="p-StatLatest t-small">Latest Resource</h2>
            <p><a href={latest.fullUrl}>{latest.title}</a></p>
          </span>
        )}
      </aside>
    )
  }
}

export default Statistics
