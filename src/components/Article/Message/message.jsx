import React from 'react';
import classes from './message.module.css';
import Dialogs from './Dialogs/dialogs';
import Dialog from './Dialog/dialog';

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <Dialogs messagesPage={props.messagesPage}/>
            <Dialog messagesPage={props.messagesPage}
            dispatch={props.dispatch} />
        </div>
    );
}

export default Messages;