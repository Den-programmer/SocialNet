import React from 'react';
import classes from './message.module.css';
import Dialogs from './Dialogs/dialogs';
import Dialog from './Dialog/dialog';

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <Dialogs dialogsData={props.dialogsData}/>
            <Dialog render={props.render}
            messagesPage={props.messagesPage}
            dispatch={props.dispatch} 
            newMessageValue={props.newMessageValue} 
            Messages={props.Messages}
            />
        </div>
    );
}

export default Messages;