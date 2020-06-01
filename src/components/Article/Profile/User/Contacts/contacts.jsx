import React from 'react';
import classes from './contacts.module.css';
import Contact from './Contact/contact';


const Contacts = (props) => {
    let contacts = props.contacts.map(contact => {
        let hasContact = contact.title && contact.value;
        return <Contact key={contact.id} contactTitle={hasContact ? contact.title : ''} 
                        contactValue={hasContact ? contact.value : ''}/>
    });

    return (
        <div className={classes.userInf}>
            <div className={classes.contacts}>
                <div className={classes.title}>
                    <h3>{props.contacts.some(item => item.value !== '' || !item.value) ? "Contacts" : ''}</h3>
                </div>
                <div classes={classes.information}>
                    {contacts}
                </div>
            </div>
        </div>
    );
}

export default Contacts;