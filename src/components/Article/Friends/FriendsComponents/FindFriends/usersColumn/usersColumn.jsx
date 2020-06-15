import React from 'react';
import User from './user/user';
import classes from './usersColumn.module.css'

const UsersColumn = (props) => {
    let users = props.users.map((user) => {
        return <User id={user.id}
            followThunk={props.followThunk}
            unfollowThunk={props.unfollowThunk}
            key={user.id}
            followingInProcess={props.followingInProcess}
            followed={user.followed}
            nickname={user.nickname}
            name={user.name}
            photo={user.photos.small}
            setUsers={props.setUsers}/>
    });

    return (
        <div className={classes.usersColumn}>
            <div className={classes.users}>
                {users}
            </div>
        </div>
    );
}

export default UsersColumn;