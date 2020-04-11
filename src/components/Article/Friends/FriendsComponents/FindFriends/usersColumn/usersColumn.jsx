import React from 'react';
import classes from './usersColumn.module.css';
import User from './user/user';

const UsersColumn = (props) => {
    
    let users = props.users.map((user) => {
        return <User id={user.id} 
                     key={user.id} 
                     users={props.users}
                     followed={user.followed}
                     nickname={user.nickname} 
                     name={user.name} 
                     avatar={user.avatar} 
                     follow={props.follow} unfollow={props.unfollow}/>
    });
    
    return (
        <div className={classes.usersColumn}>
            {users}
        </div>
    );
}

export default UsersColumn;