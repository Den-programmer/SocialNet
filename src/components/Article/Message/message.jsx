import React from 'react';
import classes from './message.module.css';
import Dialogs from './Dialogs/dialogs';
import Dialog from './Dialog/dialog';

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <Dialogs dialogsData={props.dialogsData}/>
            <Dialog Messages={props.state.messagesPage.messages}/>
        </div>
    );
}


export default Messages;