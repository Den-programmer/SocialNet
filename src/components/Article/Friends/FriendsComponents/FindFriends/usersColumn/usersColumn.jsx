import React from 'react';
import User from './user/user';
import classes from './usersColumn.module.css'

const UsersColumn = (props) => {

    let users = props.users.map((user) => {
        return <User id={user.id}
            key={user.id}
            followed={user.followed}
            nickname={user.nickname}
            name={user.name}
            photo={user.photos.small}
            setUsers={props.setUsers}
            follow={props.follow} unfollow={props.unfollow} />
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