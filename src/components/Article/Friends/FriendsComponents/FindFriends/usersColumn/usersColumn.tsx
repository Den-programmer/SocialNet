import React from 'react'
import User from './user/user'
import classes from './usersColumn.module.css'
import { userType } from '../../../../../../types/FriendsType/friendsType'

interface UsersColumnPropsType {
    users: Array<userType>
    followingInProcess: Array<number>
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

const UsersColumn: React.FC<UsersColumnPropsType> = (props) => {
    let users = props.users.map((user: userType) => {
        return <User id={user.id}
            followThunk={props.followThunk}
            unfollowThunk={props.unfollowThunk}
            key={user.id}
            followingInProcess={props.followingInProcess}
            followed={user.followed}
            nickname={user.nickname}
            name={user.name}
            photo={user.photo}/>})
    return (
        <div className={classes.usersColumn}>
            <div className={classes.users}>
                {users}
            </div>
        </div>
    )
}

export default UsersColumn