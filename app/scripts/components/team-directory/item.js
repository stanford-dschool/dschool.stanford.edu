import React, { PropTypes } from 'react'

const DirectoryItem = ({ name, url }) => (
  <li className="Directory-list-item List-item">
    <a className="t-capitalize" href={`/team-member?name=${url}`}>
      {name}
    </a>
  </li>
  )

DirectoryItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
}

export default DirectoryItem
