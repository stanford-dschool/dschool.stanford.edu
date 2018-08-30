import React, { PropTypes } from 'react'
import classNames from 'classnames'
import DateField from '../date-field'

const MediumCard = ({ url, title, author, published, inverted }) => (
  <aside className={classNames('HeyHowdy', 'HeyHowdy--medium', inverted && 'HeyHowdy--dark')}>
    <a className="HeyHowdy-link" href={url} />
    <div className="HeyHowdy-content">
      <h1 className="HeyHowdy-title">Medium</h1>
      <h2 className="HeyHowdy-article">{title}</h2>
      <DateField className="HeyHowdy-date" epoch={published} />
      <p className="HeyHowdy-author">
        by <a className="HeyHowdy-authorLink" href={author.url}>{author.name}</a>
      </p>
    </div>
  </aside>
)

MediumCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  published: PropTypes.number,
  inverted: PropTypes.bool,
  author: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default MediumCard
