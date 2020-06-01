import React from 'react';
import classes from './changeContactForm.module.css';
import { reduxForm, Field } from 'redux-form';

const ChangeContactForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.contact}>
            <h4>{props.title}</h4>
            <div className={classes.dFlex}>
                <Field className={classes.urlInput} value={props.val} type="text" name={props.title} component="input"/>
                <div className={classes.btn_confirm}>
                    <button>Confirm</button>
                </div>
            </div>
        </form>
    );
}

const ChangeContactReduxForm = reduxForm({
    form: 'contacts',
})(ChangeContactForm);

export default ChangeContactReduxForm;