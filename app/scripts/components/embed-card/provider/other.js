import React, { PropTypes } from 'react'
import classNames from 'classnames'

const OtherCard = ({ provider, url, title, favicon }) => (
  <aside className={classNames('HeyHowdy', 'HeyHowdy--website')}>
    <a className="HeyHowdy-link" href={url} target="_blank" rel="noopener noreferrer" />
    <div className="HeyHowdy-content">
      <img className={`HeyHowdy-favicon ${(favicon ? 'is-visible' : 'is-hidden')}`} src={favicon} alt="{provider} icon" />
      <h1 className="HeyHowdy-title">{provider}</h1>
      <h2 className="HeyHowdy-article">{title}</h2>
      <span className="CtaButton--borderless">Learn More</span>
    </div>
  </aside>
)

OtherCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  favicon: PropTypes.string.isRequired,
}

export default OtherCard
