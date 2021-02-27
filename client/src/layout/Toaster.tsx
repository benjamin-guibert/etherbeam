import React, { FC } from 'react'
import List from '../components/List'
import ListItem from '../components/ListItem'
import Toast from '../components/Toast'
import { ToastType } from './toaster-helper'
import './Toaster.scss'

interface ToasterProps {
  toasts: ToastType[]
}

const Toaster: FC<ToasterProps> = ({ toasts }) => {
  return (
    <List className="my-toaster">
      {toasts.map(({ id, type, content }) => (
        <ListItem key={id}>
          <Toast type={type}>{content}</Toast>
        </ListItem>
      ))}
    </List>
  )
}

export default Toaster
