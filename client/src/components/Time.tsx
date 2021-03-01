import moment from 'moment'
import React, { FC } from 'react'
import './Time.scss'

interface TimeProps {
  dateTime: Date
}

const Time: FC<TimeProps> = ({ dateTime }: TimeProps) => {
  return <span className="my-time">{moment(dateTime).format('HH:mm')}</span>
}

export default Time
