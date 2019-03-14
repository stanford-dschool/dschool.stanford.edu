import React, { PropTypes } from 'react'

const DirectoryItem = ({ name, url }) => (
  <li className="Directory-list-item List-item">
    {name}
  </li>
  )

DirectoryItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
}

export default DirectoryItem
