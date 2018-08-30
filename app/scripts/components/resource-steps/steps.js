import React, { PropTypes } from 'react'

const Steps = ({ steps }) => (
  <ol className="p-Steps-list">
    {steps.map(({ title, content, cta, tag }, i) => (
      <li key={i} className="p-Steps-item">
        <div className="Container">
          <div className="Grid">
            <div className="Grid-cell u-md-size4 u-lg-offset2 p-Steps-title">
              <div className="p-Steps-tag">{tag || `Step ${i + 1}`}</div>
              {title}
            </div>
            <div className="Grid-cell u-md-size9 u-lg-size6 p-Steps-content" dangerouslySetInnerHTML={{ __html: content }} />
            {cta && (
              <div className="Grid-cell u-md-size3 u-textRight">
                <a className="p-Steps-cta" href={cta.href} target="_blank" rel="noopener noreferrer">{cta.label}</a>
              </div>
            )}
          </div>
        </div>
      </li>
    ))}
  </ol>
)

Steps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      tag: PropTypes.string,
      content: PropTypes.string.isRequired,
      cta: PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    })
  ),
}

export default Steps
