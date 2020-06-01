import React from 'react';
import classes from './contact.module.css';

const Contact = (props) => {
    return (
    <>
        <h4 className={classes.contactTitle}>{props.contactTitle + ': ' + props.contactValue}</h4>
    </>
    );
}

export default Contact; 