import React from 'react';
import classes from './message.module.css';
import DialogContainer from './Dialog/dialogContainer';
import DialogsContainer from './Dialogs/dialogsContainer';

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <DialogsContainer messagesPage={props.messagesPage}/>
            <DialogContainer messagesPage={props.messagesPage}
            dispatch={props.dispatch} />
        </div>
    );
}

export default Messages;