import React, { PropTypes } from 'react'
import classNames from 'classnames'

const TwitterCard = ({ url, author, description, inverted }) => (
  <aside className={classNames('HeyHowdy', 'HeyHowdy--twitter', inverted && 'HeyHowdy--dark')}>
    <a className="HeyHowdy-link" href={url} />
    <div className="HeyHowdy-content">
      <h1 className="HeyHowdy-title">Twitter</h1>
      <div className="HeyHowdy-status" dangerouslySetInnerHTML={{ __html: description }} />
      <p className="HeyHowdy-author">
        <a className="HeyHowdy-authorLink" href={author.url}>@{author.name}</a>
      </p>
    </div>
  </aside>
)

TwitterCard.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
  author: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default TwitterCard
