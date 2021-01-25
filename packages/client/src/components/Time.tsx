import moment from 'moment'
import React, { ReactElement } from 'react'
import './Time.scss'

interface TimeProps {
  dateTime: Date
}

const Time = ({ dateTime }: TimeProps): ReactElement => {
  return <span className="my-time">{moment(dateTime).format('HH:mm')}</span>
}

export default Time
