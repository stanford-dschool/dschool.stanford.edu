import React from 'react'
import classNames from 'classnames'
import Frame from '../frame'
import { extractContent } from '../../utilities'

class SearchFeatured extends React.Component {
  static propTypes = {
    query: React.PropTypes.string,
    recordCount: React.PropTypes.number,
    mainCard: React.PropTypes.object,
    gridCards: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  renderMainCard = (card) => {
    if (card) {
      const bodyHTML = extractContent(card.description).slice(0, 80) || card.highlight.body
      const header = card.content_type ? card.content_type.split('-').join(' ') : 'What is this about?'
      const titleHTML = card.title || card.highlight.sections
      const title = card.title
      return (
        <div className="Search-result--main u-size15 u-sm-size7">
          <div className="Search-result--main-title">
            <span className={classNames(this.props.query.trim().length < 1 && 'u-hide', 't-tag')}>showing results for: "{this.props.query}"</span>
            {
              titleHTML ?
                (<a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-CollectionTitle t-title Search-link Search-link--main"
                  href={card.url}
                  dangerouslySetInnerHTML={{ __html: `${titleHTML}` }}
                />
                ) :
                (<a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-CollectionTitle t-title Search-link"
                  href={card.url}
                >{title}
                </a>)
            }
          </div>

          <div className="Search-description--main u-sm-offset2 u-offset3 u-md-size5 u-size12">
            { bodyHTML ?
              (<div className="HeyHowdy">
                <a target="_blank" rel="noopener noreferrer" href={card.url} className="Search-featured-link">
                  <div className="t-tag">{header}</div>
                  <div className="Search-description--text" dangerouslySetInnerHTML={{ __html: `${bodyHTML}...` }} />
                  <p className="Search-discover u-link">learn more<i className="DirectionalArrow DirectionalArrow--right u-linkArrow" /></p>
                </a>
              </div>) :
              '' }
          </div>

          <div className="Search-image--main u-md-size13">
            <figure className="FrameContainer u-largeShadow">
              <div style={{ backgroundImage: `url(${card.image})` }} className="p-CollectionImage" />
              <Frame className="Frame--b" />
            </figure>
          </div>
        </div>
      )
    }
    return null
  }

  renderGridCard = (card, index) => {
    const titleHTML = card.highlight.sections ? card.highlight.sections : card.highlight.title
    const title = card.title
    const header = card.content_type ? card.content_type.split('-').join(' ') : card.sections[0]
    return (
      <li key={index} className="Search-featured-card p-Class HeyHowdy">
        <a className="Search-featured-link" target="_blank" rel="noopener noreferrer" href={card.url}>
          <span className="t-tag">{header}</span>
          {
            title ?
              (<p className="Search-featured-title">{title}</p>):
              (<p className="Search-featured-title" dangerouslySetInnerHTML={{ __html: titleHTML }} />)

          }
          <p className="Search-discover u-link">learn more<i className="DirectionalArrow DirectionalArrow--right u-linkArrow" /></p>
        </a>
      </li>
    )
  }

  renderGridCards = cards =>
    (
      <div className="Search-featured-grid u-md-offset1 u-md-size8">
        {
          this.props.recordCount > 0 ?
          (<p className="Search-count p-Class-type t-tag"><span className="Search-count--detail">{this.props.recordCount} results</span></p>)
          : null
        }
        <ul className="HeyHowdyGrid">
          {cards.map((card, index) => this.renderGridCard(card, index))}
        </ul>
      </div>
    )

  render() {
    const { mainCard, gridCards } = this.props

    return (
      <section className="Container Search-featured p-Collection has-parallax" data-parallax>
        {this.renderMainCard(mainCard)}
        {this.renderGridCards(gridCards)}
      </section>
    )
  }
}

export default SearchFeatured
