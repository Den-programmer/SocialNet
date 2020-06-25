import React from 'react';
import classes from './changeContacts.module.css';
import ChangeContactsForm from './changeContactsForm/changeContactsForm';

const ChangeContacts = (props) => {
    let onSubmit = (formData) => {
        let profile = {
            fullName: props.userName,
            contacts: formData
        }   
        props.saveProfile(profile);
    } 
    return (
        <div className={classes.changeContacts}>
            <div className={classes.title}>
                <h4>Change contacts:</h4>
            </div>
            <ChangeContactsForm initialValues={props.contacts} {...props} onSubmit={onSubmit}/>
        </div>
    )
}

export default ChangeContacts;