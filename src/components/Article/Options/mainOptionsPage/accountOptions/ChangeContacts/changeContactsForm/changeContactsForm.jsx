import React from 'react';
import classes from './changeContactsForm.module.css';
import ChangeContact from './changeContact/changeContact';
import { reduxForm } from 'redux-form';

const ChangeContactsForm = (props) => {
    let contacts = Object.keys(props.contacts).map(key => {
        return <ChangeContact key={key} title={key} val={props.contacts[key]}/>
    });
    return (
        <form onSubmit={props.handleSubmit} className={classes.contactsForm}>
            <div className={classes.contacts}>
                {contacts}
            </div>
            <div className={classes.btn_confirm}>
                <button>Confirm</button>
            </div>
            {props.error && <div className={classes.error}>{props.error}</div>}
        </form>
    );
}
const ChangeContactsReduxForm = reduxForm({
    form: 'ChangeContacts'
})(ChangeContactsForm);

export default ChangeContactsReduxForm;