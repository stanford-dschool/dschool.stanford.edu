import React, { PropTypes } from 'react'

const DirectoryItemLink = ({ name, url }) => (
  <li className="Directory-list-item List-item">
    <a className="t-capitalize" href={`/team-member?name=${url}`}>
      {name}
    </a>
  </li>
  )

DirectoryItemLink.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
}

export default DirectoryItemLink
