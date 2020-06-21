import React from 'react';
import classes from './changeContacts.module.css';
import ChangeContact from './changeContact/changeContact';

const ChangeContacts = (props) => {
    let contacts = props.contacts.map(contact => {
        return <ChangeContact key={contact.id} id={contact.id} title={contact.title} val={contact.value} changeContacts={props.changeContacts}/>
    });
    return (
        <div className={classes.changeContacts}>
            <div className={classes.title}>
                <h4>Change contacts:</h4>
            </div>
            <div className={classes.contacts}>
                {contacts}
            </div>
        </div>
    )
}

export default ChangeContacts;