import React, { PropTypes } from 'react'
import classNames from 'classnames'

const InstagramCard = ({ url, image, author, description, inverted }) => (
  <aside className={classNames('HeyHowdy', 'HeyHowdy--instagram', inverted && 'HeyHowdy--dark')}>
    <div className="HeyHowdy-image" style={{ backgroundImage: `url(${image})` }} />
    <div className="HeyHowdy-content">
      <div className="HeyHowdy-text">
        <h1 className="HeyHowdy-title">Instagram</h1>
        <div className="HeyHowdy-status" dangerouslySetInnerHTML={{ __html: description }} />
        <p className="HeyHowdy-author">@{author.name}</p>
      </div>
    </div>
    <a className="HeyHowdy-link" href={url} />
  </aside>
)

InstagramCard.propTypes = {
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  published: PropTypes.number,
  inverted: PropTypes.bool,
  author: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  image: PropTypes.string.isRequired,
}

export default InstagramCard
