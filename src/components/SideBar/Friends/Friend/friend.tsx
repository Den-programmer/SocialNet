import React from 'react';
import classes from './friend.module.css';
import { NavLink } from 'react-router-dom';

interface FriendPropsType {
    avatar: string
    nickname: string
    name: string
    id: number
}

const Friend:React.FC<FriendPropsType> = ({avatar, nickname, name, id}) => {
    return (
        <div className={classes.friend}>
            <NavLink className={classes.friendLink} to={`/Profile/${id}`}>
                <img src={avatar} alt="" />
                <h6 className={classes.friendsName}>
                    {nickname ? nickname : name}
                </h6>
            </NavLink>
        </div>
    );
}

export default Friend;