import React from 'react';
import classes from './messagesTitle.module.css';

const MessagesTitle = (props) => {
    return (
        <div className={classes.title}>
            <h2>{props.title}</h2>
        </div>
    );
} 

export default MessagesTitle;