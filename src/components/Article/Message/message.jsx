import React from 'react';
import classes from './message.module.css';
import DialogContainer from './Dialog/dialogContainer';
import DialogsContainer from './Dialogs/dialogsContainer';

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <DialogsContainer/>
            <DialogContainer/>
        </div>
    );
}

export default Messages;