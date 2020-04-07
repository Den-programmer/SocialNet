import React from 'react';
import classes from './usersColumn.module.css';
import User from './user/user';

const UsersColumn = (props) => {
    
    let users = props.users.map((user) => {
        return <User id={user.id} key={user.id} nickname={user.nickname} name={user.name} avatar={user.avatar}/>
    });
    
    return (
        <div className={classes.usersColumn}>
            {users}
        </div>
    );
}

export default UsersColumn;