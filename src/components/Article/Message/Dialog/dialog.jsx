import React from 'react';
import classes from './dialog.module.css';
import Conversation from './Conversation/conversation';
import DialogReduxForm from './dialogForm/dialogForm';

const Dialog = (props) => {
    let Messages = props.messages.map((ms) => {
        return <Conversation key={ms.id} id={ms.id} messageText={ms.messageText} />
    });
    let onSubmit = (FormData) => {
        let newMessage = FormData.dialog;
        props.addMessage(newMessage);   
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

export default Dialog;