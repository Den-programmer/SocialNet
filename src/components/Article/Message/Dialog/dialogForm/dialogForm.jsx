import React from 'react';
import classes from './dialogForm.module.css';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, enteredNothingError } from '../../../../../utils/validators/validators';
import { Input, createField } from '../../../../common/Forms/forms';

const maxMessageLength = maxLengthCreator(90);

const DialogForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.sendMessage}>
                {createField("text", "Enter your message...", "dialog", Input, [maxMessageLength, enteredNothingError])}        
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

export default DialogReduxForm;