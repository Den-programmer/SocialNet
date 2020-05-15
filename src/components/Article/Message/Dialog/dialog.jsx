import React from 'react';
import classes from './dialog.module.css';
import Conversation from './Conversation/conversation';
import { Field, reduxForm } from 'redux-form';

const Dialog = (props) => {
    let Messages = props.messages.map((ms) => {
        return <Conversation key={ms.id} id={ms.id} messageText={ms.messageText} />
    });
    let onSubmit = (FormData) => {
        let newMessage = FormData.dialog;
        props.addMessage(newMessage);   
    }

    return (
        <div className={classes.dialog}>
            <div className={classes.messages}>
                {Messages}
            </div>
            <DialogReduxForm onSubmit={onSubmit} />
        </div>
    );
}
const DialogForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.sendMessage}>
                <Field placeholder="Enter your message..." name="dialog" className={classes.sendMessage__input} type="text" component="input" />
                <div className={classes.sendMessage__btn}>
                    <button>Send</button>
                </div>
            </div>
        </form>
    );
}

const DialogReduxForm = reduxForm({
    form: 'dialog'
})(DialogForm);

export default Dialog;