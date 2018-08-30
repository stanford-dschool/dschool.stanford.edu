import React, { PropTypes } from 'react'
import FacebookCard from './provider/facebook'
import InstagramCard from './provider/instagram'
import MediumCard from './provider/medium'
import TwitterCard from './provider/twitter'
import OtherCard from './provider/other'

const Card = ({ provider, ...props }) => {
  switch (provider) {
    case 'Facebook':
      return <FacebookCard {...props} />
    case 'Instagram':
      return <InstagramCard {...props} />
    case 'Twitter':
      return <TwitterCard {...props} />
    case 'Medium':
      return <MediumCard {...props} />
    default:
      return <OtherCard provider={provider} {...props} />
  }
}

Card.propTypes = {
  provider: PropTypes.string,
}

export default Card
