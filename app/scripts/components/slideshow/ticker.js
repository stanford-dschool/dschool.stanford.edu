import React from 'react'

const Ticker = ({ isActive, onClick }) => (
  <div
    className="Ticker"
    data-active={isActive}
    onClick={onClick}
  >
    <div className="TickerPie TickerSpinner" />
    <div className="TickerPie TickerFiller" />
    <div className="TickerMask" />
  </div>
)

Ticker.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  isActive: React.PropTypes.bool,
}

export default Ticker
