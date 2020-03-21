import React from 'react';
import classes from './message.module.css';

const Messages = (props) => {
    return(
        <div className={classes.message}>
            <p>
                {props.Messages}
            </p>
     </div>
    );
}

export default Messages; 