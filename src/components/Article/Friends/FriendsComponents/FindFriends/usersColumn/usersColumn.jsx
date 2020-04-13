import React from 'react';
import classes from './usersColumn.module.css';
import User from './user/user';
import * as axios from 'axios';

const UsersColumn = (props) => {
    console.log(props.users);
    // Нужно получить доступ к серваку для запросов!
    let setUsers = () => {
        if (props.users.length == 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                debugger
                props.setUsers(response.data.items);
            });
        }
    }
    
    let users = props.users.map((user) => {
        return <User id={user.id} 
                     key={user.id} 
                     users={props.users}
                     followed={user.followed}
                     nickname={user.nickname} 
                     name={user.name} 
                     avatar={user.avatar} 
                     setUsers={props.setUsers}
                     follow={props.follow} unfollow={props.unfollow}/>
    });
    
    return (
        <div className={classes.usersColumn}>
            <button onClick={setUsers}>
                Get Users
            </button>
            {users}
        </div>
    );
}

export default UsersColumn;