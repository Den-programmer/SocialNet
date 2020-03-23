import React from 'react';
import classes from './message.module.css';
import Dialogs from './Dialogs/dialogs';
import Dialog from './Dialog/dialog';

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <Dialogs dialogsData={props.dialogsData}/>
            <Dialog state={props.state} render={props.render}
            dispatch={props.dispatch} 
            newMessageValue={props.state.messagesPage.NewMessageValue} 
            Messages={props.state.messagesPage.messages}
            />
        </div>
    );
}

export default Messages;