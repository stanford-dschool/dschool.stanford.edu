import React from 'react'

const ResourceItem = ({ fullUrl, title, tags, excerpt, systemDataId, assetUrl }) => (
  <li
    className="Columns-item"
    data-tags={tags.join(',')}
  >
    <div className="BorderedBox">
      <div
        className="BorderedBox-img"
        style={{ backgroundImage: systemDataId ?
          `linear-gradient(to top, rgba(0, 0, 0, .4) 0, rgba(0, 0, 0, .4) 100%), url(${assetUrl}?format=500w)` :
          null }}
      />
      <a href={fullUrl} className="BorderedBox-content">
        <h4 className="BorderedBox-title">{title}</h4>
        {excerpt}
      </a>
    </div>
  </li>
)

ResourceItem.propTypes = {
  fullUrl: React.PropTypes.string,
  title: React.PropTypes.string,
  systemDataId: React.PropTypes.string,
  tags: React.PropTypes.array,
  assetUrl: React.PropTypes.string,
  excerpt: React.PropTypes.string,
  classes: React.PropTypes.array,
}

export default ResourceItem
