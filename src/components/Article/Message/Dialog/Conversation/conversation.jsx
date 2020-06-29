import React from 'react';
import classes from './conversation.module.css';

const Conversation = ({ messageText }) => {
    return (
        <div className={classes.currentColumn}>
            <span className={classes.conversation}>
                <p>
                    {messageText}
                </p>
            </span>
        </div>
    );
}

export default Conversation; 