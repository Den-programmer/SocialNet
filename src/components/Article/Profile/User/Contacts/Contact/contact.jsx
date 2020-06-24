import React from 'react';
import classes from './contact.module.css';

const Contact = (props) => {
    let hasContact = props.contactTitle && props.contactValue;
    return (
    <>
        {hasContact && <h4 className={classes.contactTitle}>{props.contactTitle + ': ' + props.contactValue}</h4>}
    </>
    );
}

export default Contact; 