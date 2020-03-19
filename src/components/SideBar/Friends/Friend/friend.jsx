import React from 'react';
import classes from './friend.module.css';

const Friend = (props) => {
    return (
        <div className={classes.friend}>
            <img src={props.avatar} alt="" />
            <h6 className={classes.friendsName}>
                {props.name}
            </h6>
        </div>
    );
}

export default Friend;