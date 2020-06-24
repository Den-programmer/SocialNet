import React from 'react';
import classes from './changeContacts.module.css';
import ChangeContact from './changeContact/changeContact';

const ChangeContacts = (props) => {
    let contacts = Object.keys(props.contacts).map(key => {
        return <ChangeContact key={key} title={key} val={props.contacts[key]}/>
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