import React from 'react'

const DateField = ({ className, epoch }) => {
  if (!epoch) { return null }
  const dateString = (new Date(epoch)).toDateString()
  const [, month, day] = dateString.split(' ')
  return <time className={className} dateTime={dateString}>{month} {day}</time>
}

DateField.propTypes = {
  epoch: React.PropTypes.number,
  className: React.PropTypes.string,
}

export default DateField
