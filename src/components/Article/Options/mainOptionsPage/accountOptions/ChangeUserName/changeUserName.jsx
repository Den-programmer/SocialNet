import React from 'react';
import classes from './changeUserName.module.css';

const ChangeUserName = (props) => {
    return (
        <div className={classes.changeUserName}>
            <label>
                Change User Nickname <input type="text" />
            </label>
        </div>
    );
}

export default ChangeUserName;