import React from 'react';
import classes from './changeUserName.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ChangeUserName = (props) => {
    let changeNameInput = React.createRef();

    let [userName, setUserName] = useState(props.userName);

    let onUserNameChange = (e) => {
        setUserName(e.currentTarget.value);
    }
    let changeUserName = () => {
        let userNameVal = changeNameInput.current.value;
        let profile = {
            fullName: userNameVal,
            contacts: props.contacts
        }
        props.saveProfile(profile);
    }

    return (
        <div className={classes.changeUserName}>
            <label>
                Change User Nickname <input ref={changeNameInput} 
                onChange={onUserNameChange} 
                type="text" value={userName}/>
            </label>
            <div className={classes.btn_confirmChanges}>
                <NavLink to={"/Profile"}>
                    <button onClick={changeUserName}>
                        Confirm
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default ChangeUserName;