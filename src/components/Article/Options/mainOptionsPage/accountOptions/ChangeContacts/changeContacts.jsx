import React from 'react';
import classes from './changeContacts.module.css';
import ChangeContactForm from './ChangeContact/changeContactForm';

const ChangeContacts = (props) => {
    let contacts = props.contacts.map(contact => {
        let onSubmit = (FormData) => {
            console.log(FormData);
        }
        return <ChangeContactForm key={contact.id} title={contact.title} val={contact.value} onSubmit={onSubmit}/>
    });
    // You can do map to present this elements with titles of contacts through state!
    // If you cannot get property and its value at the same time, you 
    // can create an object that will contain title and its value as properties,
    // then If you need to post it to server API you can create another special object to post with properties, which
    // require server! 
    return (
        <div className={classes.changeContacts}>
            <div className={classes.title}>
                <h4>Change contacts:</h4>
            </div>
            <div className={classes.changePanel}>
                {contacts}
            </div>
        </div>
    );
}

export default ChangeContacts;