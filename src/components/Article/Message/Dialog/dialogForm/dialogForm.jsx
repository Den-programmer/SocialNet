import React from 'react';
import classes from './dialogForm.module.css';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, enteredNothingError } from '../../../../../utils/validators/validators';
import { Input } from '../../../../common/Forms/forms';

const maxMessageLength = maxLengthCreator(90);

const DialogForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.sendMessage}>
                <Field placeholder="Enter your message..." 
                        name="dialog" 
                        className={classes.sendMessage__input} 
                        type="text" component={Input} 
                        validate={[maxMessageLength, enteredNothingError]}/>
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