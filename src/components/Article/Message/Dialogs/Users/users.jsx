import React from 'react';
import classes from './users.module.css';
import User from './User/user';
import user from './User/images/user.jpg';

const Users = ({dialogsData}) => {

    let dialogs = dialogsData.map(d => {
        return <User key={d.id} avatar={user} id={d.id} nickname={d.nickname} lastMessage={d.lastMessage}/>
    });
    
    return (
        <div className={classes.users}>
            {dialogs}
        </div>
    );
} 

export default Users;

