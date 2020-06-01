import React from 'react';
import classes from './accountOptions.module.css';
import EditPhoto from './editPhoto/editPhoto';
import ChangeUserName from './ChangeUserName/changeUserName';
import ChangeContacts from './ChangeContacts/changeContacts';

const AccountOptions = (props) => {
    return (
        <div className={classes.accountOptions}>
            <EditPhoto setUserPhoto={props.setUserPhotoThunk}/>
            <ChangeUserName userName={props.userName} changeUserName={props.changeUserName}/>
            <ChangeContacts contacts={props.contacts}/>
        </div>
    );
}

export default AccountOptions;