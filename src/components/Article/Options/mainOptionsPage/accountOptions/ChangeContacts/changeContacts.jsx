import React from 'react';
import classes from './changeContacts.module.css';
import ChangeContactsReduxForm from './ChangeContactsForm/changeContactsForm';

const ChangeContacts = (props) => {
    let onSubmit = (FormData) => {
        console.log(FormData);
    }
    return (
        <div className={classes.changeContacts}>
            <div className={classes.title}>
                <h4>Change contacts:</h4>
            </div>
            <ChangeContactsReduxForm contacts={props.contacts} onSubmit={onSubmit}/>
        </div>
    )
}

export default ChangeContacts;