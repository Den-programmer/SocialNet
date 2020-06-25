import React from 'react';
import classes from './contact.module.css';

const Contact = ({contactTitle, contactValue}) => {
    let hasContact = contactTitle && contactValue;
    return (
        <div className={classes.contact}>
            {hasContact && <><h4 className={classes.contactTitle}>{contactTitle + ': '}</h4>
            <p>{contactValue}</p></>}
        </div>
    );
}

export default Contact; 