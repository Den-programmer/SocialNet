import React from 'react';
import classes from './messagesTitle.module.css';

const MessagesTitle = ({title}) => {
    return (
        <div className={classes.title}>
            <h2>{title}</h2>
        </div>
    );
} 

export default MessagesTitle;