import React from 'react';
import Dialogs from './dialogs';

const DialogsContainer = (props) => {
    return (
        <Dialogs dialogsData={props.messagesPage.dialogsData}/>
    );
}

export default DialogsContainer;