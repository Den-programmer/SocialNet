import React from 'react';
import classes from './friend.module.css';

const Friend = ({avatar, nickname}) => {
    return (
        <div className={classes.friend}>
            <img src={avatar} alt="" />
            <h6 className={classes.friendsName}>
                {nickname}
            </h6>
        </div>
    );
}

export default Friend;