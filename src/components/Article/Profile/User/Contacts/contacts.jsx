import React from 'react';
import classes from './contacts.module.css';
import Contact from './Contact/contact';


const Contacts = (props) => {
    let contacts = Object.keys(props.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={props.contacts[key]}/>
    });

    return (
        <div className={classes.userInf}>
            <div className={classes.contacts}>
                <div className={classes.title}>
                    <h3>{Object.keys(props.contacts).some(item => props.contacts[item] === '' || !props.contacts[item]) ? "" : 'Contacts'}</h3>
                </div>
                <div classes={classes.information}>
                    {contacts}
                </div>
            </div>
        </div>
    );
}

export default Contacts;