import React from 'react';
import classes from './usersColumn.module.css';
import User from './user/user';
import * as axios from 'axios';

const UsersColumn = (props) => {
    let setUsers = () => {
        if (props.users.length == 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items);
            });
        }
    }
    console.log(props.users.photo);
    
    let users = props.users.map((user) => {
        return <User id={user.id} 
                     key={user.id} 
                     users={props.users}
                     followed={user.followed}
                     nickname={user.nickname} 
                     name={user.name} 
                     photo={user.photos.small} 
                     setUsers={props.setUsers}
                     follow={props.follow} unfollow={props.unfollow}/>
    });
    
    return (
        <div className={classes.usersColumn}>
            <div className={classes.btn_setUsers}>
                <button onClick={setUsers}>
                     Get Users
                </button>
            </div>
            <div className={classes.users}>
                {users}
            </div>
        </div>
    );
}

export default UsersColumn;