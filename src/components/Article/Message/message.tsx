import React from 'react'
import classes from './message.module.css'
import DialogContainer from './Dialog/dialogContainer'
import DialogsContainer from './Dialogs/dialogsContainer'

interface MessagesPropsType { }

const Messages: React.FC<MessagesPropsType> = ({}) => {
    return <div className={classes.messages}>
        <DialogsContainer />
        <DialogContainer />
    </div>
}

export default Messages