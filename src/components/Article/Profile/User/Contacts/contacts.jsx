import React from 'react';
import classes from './contacts.module.css';


const Contacts = (props) => {

    let contacts = props.contacts;

    return (
        <div className={classes.userInf}>
            <div className={classes.contacts}>
                <div className={classes.title}>
                    <h3>Contacts:</h3>
                </div>
                <div classes={classes.information}>
                    <h4>{contacts.facebook ? "Facebook: " + contacts.facebook : ''}</h4>
                    <h4>{contacts.instagram ? "Instagram: " + contacts.instagram : ''}</h4>
                    <h4>{contacts.twitter ? "Twitter: " + contacts.twitter : ''}</h4>
                    <h4>{contacts.vk ? "VK: " + contacts.vk : ''} </h4>
                </div>
            </div>
        </div>
    );
}

export default Contacts;