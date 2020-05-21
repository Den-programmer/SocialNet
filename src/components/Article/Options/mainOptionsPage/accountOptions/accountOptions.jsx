import React from 'react';
import classes from './accountOptions.module.css';
import EditPhoto from './editPhoto/editPhoto';
import ChangeUserName from './ChangeUserName/changeUserName';

const AccountOptions = (props) => {
    return (
        <div className={classes.accountOptions}>
            <EditPhoto />
            <ChangeUserName />
        </div>
    );
}

export default AccountOptions;