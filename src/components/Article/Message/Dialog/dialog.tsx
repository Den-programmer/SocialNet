// @ts-ignore
import { messageType } from '../../../../BLL/reducer-messages'
import React from 'react'
import classes from './dialog.module.css'
import Conversation from './Conversation/conversation'
import DialogReduxForm from './dialogForm/dialogForm'

interface DialogPropsType {
    messages: Array<messageType>
    addMessage: (newMessage: string) => void
}

export interface DialogFormDataType {
    dialog: string
}

const Dialog:React.FC<DialogPropsType>  = ({messages, addMessage}) => {
    const Messages = messages.map((ms: messageType) => {
        return <Conversation key={ms.id} id={ms.id} messageText={ms.messageText} />
    });
    const onSubmit = (FormData: DialogFormDataType):void => {
        let newMessage = FormData.dialog
        addMessage(newMessage)
    }

    return (
        <div className={classes.dialog}>
            <div className={classes.messages}>
                {Messages}
            </div>
            <DialogReduxForm onSubmit={onSubmit} />
        </div>
    );
}

export default Dialog