import React from 'react';
import classes from './changeContact.module.css';
import { useState } from 'react';

const ChangeContact = ({title, val, id, changeContacts}) => {
    let [contactValue, changeContactValue] = useState(val);
    let onContactChange = (e) => {
        changeContactValue(e.currentTarget.value);
    }
    let onConfirm = (e) => {
        changeContacts(id, contactValue);
        e.preventDefault();
    }
    return (
        <div className={classes.contact}>
            <div className={classes.title}>
                <h4>{title}</h4>
            </div>
            <form className={classes.changeContactForm}>
                <input onChange={onContactChange} value={contactValue} type="text"/>
                <button onClick={onConfirm}>Confirm</button>
            </form>
        </div>
    );
}

export default ChangeContact;