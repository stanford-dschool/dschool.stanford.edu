import React, { PropTypes } from 'react'
import classNames from 'classnames'

const FacebookCard = ({ url, author, description, inverted }) => (
  <aside className={classNames('HeyHowdy', 'HeyHowdy--facebook', inverted && 'HeyHowdy--dark')}>
    <a className="HeyHowdy-link" href={url} />
    <div className="HeyHowdy-content">
      <h1 className="HeyHowdy-title">Facebook</h1>
      <div className="HeyHowdy-status" dangerouslySetInnerHTML={{ __html: description }} />
      <p className="HeyHowdy-author">
        <a className="HeyHowdy-authorLink" href={author.url}>@{author.name}</a>
      </p>
    </div>
  </aside>
)

FacebookCard.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  published: PropTypes.number,
  inverted: PropTypes.bool,
  author: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default FacebookCard
