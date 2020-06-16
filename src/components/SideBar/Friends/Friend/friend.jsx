import React from 'react';
import classes from './friend.module.css';

const Friend = ({avatar, nickname, name}) => {
    return (
        <div className={classes.friend}>
            <img src={avatar} alt="" />
            <h6 className={classes.friendsName}>
                {nickname ? nickname : name}
            </h6>
        </div>
    );
}

export default Friend;