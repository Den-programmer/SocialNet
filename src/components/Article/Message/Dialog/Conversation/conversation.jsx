import React from 'react';
import classes from './conversation.module.css';

const Conversation = (props) => {
    return(
        <div className={classes.conversation}>
            <p>
                {props.messageText}
            </p>
     </div>
    );
}

export default Conversation; 