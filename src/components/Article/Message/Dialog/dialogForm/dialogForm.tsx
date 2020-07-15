import React from 'react'
import classes from './dialogForm.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, enteredNothingError } from '../../../../../utils/validators/validators'
import { Input, createField } from '../../../../common/Forms/forms'
import { DialogFormDataType } from '../dialog'

interface PropsType {}

const maxMessageLength = maxLengthCreator(90)

const DialogForm:React.FC<InjectedFormProps<DialogFormDataType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.sendMessage}>
                {createField("text", "Enter your message...", "dialog", Input, [maxMessageLength, enteredNothingError])}        
                <div className={classes.sendMessage__btn}>
                    <button>Send</button>
                </div>
            </div>
        </form>
    );
}

const DialogReduxForm = reduxForm<DialogFormDataType, PropsType>({
    form: 'dialog'
})(DialogForm)

export default DialogReduxForm