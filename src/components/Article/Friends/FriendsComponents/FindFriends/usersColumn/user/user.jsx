import React from 'react';
import classes from './user.module.css';

const User = (props) => {
    return (
        <div className={classes.user}>
            <img src={props.avatar} alt="" />
            <h4>{props.nickname}</h4>
            <h6>{props.name}</h6>
            {props.followed ? <button>Follow</button> : <button>Unfollow</button>}
        </div>
    );
}

export default User;