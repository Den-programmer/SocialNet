import { message } from '../../../../types/MessagesTypes/messagesTypes'
import React from 'react'
import classes from './dialog.module.css'
import Conversation from './Conversation/conversation'
import DialogReduxForm from './dialogForm/dialogForm'

interface DialogPropsType {
    messages: Array<message>
    addMessage: (newMessage: string) => void
}

export interface DialogFormDataType {
    dialog: string
}

const Dialog:React.FC<DialogPropsType>  = ({messages, addMessage}) => {
    const Messages = messages.map((ms: message) => {
        return <Conversation key={ms.id} id={ms.id} messageText={ms.messageText} />
    })
    const onSubmit = (FormData: DialogFormDataType):void => {
        const newMessage = FormData.dialog
        addMessage(newMessage)
    }

    return (
        <div className={classes.dialog}>
            <div className={classes.messages}>
                {Messages.length !== 0 ? Messages 
                : <h3 className={classes.noMessagesTitle}>You have not corresponded with this user yet...</h3>}
            </div>
            <DialogReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Dialog