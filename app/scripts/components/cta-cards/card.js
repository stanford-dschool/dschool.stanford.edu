import React, { PropTypes } from 'react'

const Card = ({ title, content, cta }) => {
  const internal = (cta ? cta.href.startsWith('/') || cta.href.includes(window.location.hostname) : false)

  return (<div className="HeyHowdy HeyHowdy--cta">
    <div className="HeyHowdy-title">
      {title}
    </div>
    <div className="HeyHowdy-content" dangerouslySetInnerHTML={{ __html: content }} />
    {cta && (
      <a className="CtaButton" href={cta.href} target={internal ? '' : '_blank'} rel={internal ? '' : 'noopener noreferrer'}>
        {cta.label}
        <span className="CtaButton-arrow DirectionalArrow DirectionalArrow--right" />
      </a>
    )}
  </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
}

export default Card
