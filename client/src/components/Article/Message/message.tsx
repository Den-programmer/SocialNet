import React from 'react'
import MessagesPage from './newMessagesC'
import { useAppSelector, useAuthRedirect } from '../../../hooks/hooks'
import { selectMessages, selectUserDialogId } from '../../../BLL/selectors/messages-selectors'
import { setUserDialogId } from '../../../BLL/reducer-messages'

const Messages: React.FC = () => {
    const userDialogId = useAppSelector(selectUserDialogId)
    const messages = useAppSelector(selectMessages)
    useAuthRedirect()

    return <MessagesPage 
    messages={messages} 
    userDialogId={userDialogId}
    setUserDialogId={setUserDialogId}/>
}

export default Messages