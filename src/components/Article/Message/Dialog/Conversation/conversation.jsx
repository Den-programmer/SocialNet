import React from 'react';
import classes from './conversation.module.css';

const Conversation = ({messageText}) => {
    return(
        <div className={classes.conversation}>
            <p>
                {messageText}
            </p>
     </div>
    );
}

export default Conversation; 