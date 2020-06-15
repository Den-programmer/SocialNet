import React from 'react';
import classes from './changeContactsForm.module.css';
import ChangeContact from './ChangeContact/changeContact';
import { reduxForm } from 'redux-form';

const ChangeContactsForm = (props) => {
    let contacts = props.contacts.map(contact => {
        return <ChangeContact key={contact.id} title={contact.title} val={contact.value}/>
    });
    return (
        <form onSubmit={props.handleSubmit} className={classes.changePanel}>
            {contacts}
        </form>
    );
}

const ChangeContactsReduxForm = reduxForm({
    form: 'contacts'
})(ChangeContactsForm);

export default ChangeContactsReduxForm;