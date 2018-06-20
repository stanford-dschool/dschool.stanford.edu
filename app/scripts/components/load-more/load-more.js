import React, { Component } from 'react'
import axios from 'axios'
import FloatingImage from '../floating-image/floating-image'

const List = ({ url, title, time }) => (
  <li className="List-item p-List-item">
    <time className="p-List-time t-monospaced" dateTime={time}>{time}</time>
    <a className="p-List-content" href={url}>
      <span className="t-hoverLine p-List-title">{title}</span>
      <span className="CtaButton--borderless">Learn More</span>
    </a>
  </li>
)
List.propTypes = {
  url: React.PropTypes.string,
  time: React.PropTypes.string,
  title: React.PropTypes.string,
}

const Block = ({ url, title, time, image, excerpt, tags }) => (
  <div className="p-NewsItem">
    <div className="p-NewsItem-image">
      <FloatingImage image={image} />
    </div>
    <div className="p-NewsItem-content">
      <div className="p-NewsItem-meta">
        {tags.join(', ')}
        {tags.length > 0 && <span> - </span>}
        <time dateTime={time}>{time}</time>
      </div>
      <h3 className="p-NewsItem-title">{title}</h3>
      <div className="p-NewsItem-excerpt">{excerpt}</div>
      <a href={url} className="p-NewsItem-cta CtaButton">
        Read More <span className="CtaButton-arrow DirectionalArrow DirectionalArrow--right" />
      </a>
    </div>
  </div>
)
Block.propTypes = {
  url: React.PropTypes.string,
  time: React.PropTypes.string,
  excerpt: React.PropTypes.string,
  title: React.PropTypes.string,
  image: React.PropTypes.string,
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
}

const LoadMoreTypes = {
  list: List,
  block: Block,
}

class LoadMore extends Component {
  static propTypes = {
    source: React.PropTypes.string,
    category: React.PropTypes.string,
    tag: React.PropTypes.string,
    type: React.PropTypes.oneOf(Object.keys(LoadMoreTypes)),
  }

  static transform(item) {
    const { title, id, assetUrl, fullUrl, publishOn, excerpt, tags } = item
    const date = new Date(publishOn)
    const dateString = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear().toString().substr(2, 2)}`
    const excerptDiv = document.createElement('div')
    excerptDiv.innerHTML = excerpt
    const excerptText = excerptDiv.textContent || excerptDiv.innerText || ''
    return {
      tags,
      title,
      url: fullUrl,
      time: dateString,
      excerpt: excerptText,
      image: assetUrl,
      key: id,
    }
  }

  state = {
    items: [],
    nextPage: null,
    buttonDisable: false,
    buttonHidden: true,
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    const { source, category, tag } = this.props
    const url = `/${source}?${category ? `category=${category}&` : ''}${tag ? `tag=${tag}&` : ''}format=json`
    const { data } = await axios.get(url)
    this.populate(data)
  }

  populate(data) {
    const { pagination, items } = data
    const hasMoreData = pagination && pagination.nextPage

    // Rerender
    this.setState((nextState) => ({
      buttonDisable: false,
      buttonHidden: !hasMoreData,
      items: [...nextState.items, ...items.map(LoadMore.transform)],
      nextPage: hasMoreData && pagination.nextPageUrl,
    }))
  }

  loadNextPage = async (initial = false) => {
    const { nextPage } = this.state

    if (!initial || !nextPage) {
      return
    }

    // Disable the load button to prevent duplicate fetches.
    this.setState({ buttonDisable: true })

    // Get more items
    const { data } = await axios.get(`${nextPage}&format=json`)
    this.populate(data)
  }

  render() {
    const { items, buttonDisable, buttonHidden } = this.state
    const { type } = this.props
    const ComponentType = LoadMoreTypes[type]
    return (
      <div>
        <ul className="List p-List">
          {items.map(props => <ComponentType {...props} />)}
        </ul>
        {!buttonHidden && (
          <button
            className="LoadMore-button"
            onClick={this.loadNextPage}
            disabled={buttonDisable}
          >
            More <span className="LoadMore-buttonPlus">+</span>
          </button>
        )}
      </div>
    )
  }
}

export default LoadMore
