import React from 'react';
import classes from './users.module.css';
import User from './User/user';
import user from './User/images/user.jpg';

const Users = (props) => {

    let dialogs = props.messagesPage.dialogsData.map((d) => {
        return <User avatar={user} id={d.id} name={d.name} lastMessage={d.lastMessage}/>
    });
    
    return (
        <div className={classes.users}>
            {dialogs}
        </div>
    );
} 

export default Users;

