import React from 'react';
import classes from './message.module.css';
import Dialogs from './Dialogs/dialogs';
import Dialog from './Dialog/dialog';

const Messages = (props) => {
    return (
        <div className={classes.messages}>
            <Dialogs dialogsData={props.dialogsData}/>
            <DialogDefault />
        </div>
    );
}

const DialogDefault = (props) => {
    return(
        <Dialog defaultMessage="You haven't text this person yet!"/>
    );
}
export default Messages;