import React from 'react';
import classes from './dialog.module.css';
import Messages from './Message/message';

const Dialog = (props) => {

    let Messages = props.Messages.map((ms) => {
        return <Messages id={ms.id} message={ms.message}/>
    });

    let newMessage = React.createRef();

    return (
        <div className={classes.dialog}>
            <React.Fragment>
                {Messages}
            </React.Fragment>
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