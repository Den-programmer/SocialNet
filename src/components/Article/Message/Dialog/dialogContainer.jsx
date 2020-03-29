import React from 'react';
import Dialog from './dialog';
import {addMessageActionCreator} from '../../../../BLL/reducer-messages';
import {onNewMessageChangeActionCreator} from '../../../../BLL/reducer-messages';

const DialogContainer = (props) => {
    let addMessage = (newMessageVal) => {
        props.dispatch(addMessageActionCreator(newMessageVal));
    }
    let onNewMessageChange = (newMessageValue) => {
        props.dispatch(onNewMessageChangeActionCreator(newMessageValue));
    }

    return (
        <Dialog messagesPage={props.messagesPage} 
        onNewMessageChange={onNewMessageChange} 
        addMessage={addMessage}  
        messages={props.messagesPage.messages}/>
    );
}

export default DialogContainer;