import React from 'react';
import classes from './dialog.module.css';

const Dialog = (props) => {

    let newMessage = React.createRef();

    return (
        <div className={classes.dialog}>
            <div className={classes.default_message}>
                <p>
                    {props.defaultMessage}
                </p>
            </div>
            <div className={classes.sendMessage}>
                <input ref={newMessage} className={classes.sendMessage__input} type="text" />
                <div className={classes.sendMessage__btn}>
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Dialog;