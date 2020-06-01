import React from 'react';
import classes from './changeUserName.module.css';
import { useState } from 'react';

const ChangeUserName = (props) => {
    let changeNameInput = React.createRef();

    let [userName, setUserName] = useState(props.userName);

    let onUserNameChange = (e) => {
        setUserName(e.currentTarget.value);
    }
    let changeUserName = (e) => {
        let userNameVal = changeNameInput.current.value;
        props.changeUserName(userNameVal);
    }

    return (
        <div className={classes.changeUserName}>
            <label>
                Change User Nickname <input ref={changeNameInput} 
                                    onChange={onUserNameChange} 
                                    type="text" value={userName}/>
            </label>
            <div className={classes.btn_confirmChanges}>
                <button onClick={changeUserName}>
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default ChangeUserName;