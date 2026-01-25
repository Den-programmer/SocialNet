import React from 'react'
import MessagesPage from './newMessagesC'
import { useAuthRedirect } from '../../../hooks/hooks'

const Messages: React.FC = () => {
  useAuthRedirect()

  return <MessagesPage />
}

const MessagesWithProvider: React.FC = () => <Messages />

export default MessagesWithProvider