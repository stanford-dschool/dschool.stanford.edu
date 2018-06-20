import React from 'react'

const UpNext = ({ title, image, description, tag, link, linkText, focalPoint }) => (
  <div
    className="UpNext"
    style={{
      backgroundImage: `url(${image})`,
      backgroundPosition: `${focalPoint.x}% ${focalPoint.y}%`,
    }}
  >
    <div className="Container Container--narrow">
      <div className="UpNext-content">
        <h1 className="t-tag UpNext-tag">{tag}</h1>
        <h2 className="UpNext-title">{title}</h2>
        <div className="UpNext-author" dangerouslySetInnerHTML={{ __html: description }} />
        {link && <p><a className="CtaButton CtaButton--gorse" href={link}>{linkText}<span className="CtaButton-arrow DirectionalArrow DirectionalArrow--right" /></a></p>}
      </div>
    </div>
  </div>
)

UpNext.propTypes = {
  tag: React.PropTypes.string,
  title: React.PropTypes.string,
  image: React.PropTypes.string,
  description: React.PropTypes.string,
  link: React.PropTypes.string,
  linkText: React.PropTypes.string,
  focalPoint: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
}

export default UpNext
