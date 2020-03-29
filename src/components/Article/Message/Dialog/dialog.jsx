import React from 'react';
import classes from './dialog.module.css';
import Conversation from './Conversation/conversation';

const Dialog = (props) => {
    let newMessage = React.createRef();
    let Messages = props.messages.map((ms) => {
        return <Conversation id={ms.id} messageText={ms.messageText}/>
    });

    let addMessage = () => {
        let newMessageVal = newMessage.current.value;
        props.addMessage(newMessageVal);
        newMessage.current.value = '';
    }
    let onNewMessageChange = () => {
        let newMessageValue = newMessage.current.value;
        props.onNewMessageChange(newMessageValue);
        newMessageValue = props.messagesPage.newMessageValue;
    }

    return (
        <div className={classes.dialog}>
            <React.Fragment>
                {Messages}
            </React.Fragment>
            <div className={classes.sendMessage}>
                <input value={props.newMessageValue} onChange={ onNewMessageChange } ref={newMessage} className={classes.sendMessage__input} type="text" />
                <div className={classes.sendMessage__btn}>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Dialog;