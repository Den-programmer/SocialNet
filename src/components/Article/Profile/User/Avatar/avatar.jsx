import React from 'react';
import classes from './avatar.module.css';

const Avatar = (props) => {
    return (
        <div className={classes.avatar}>
            <img src={props.avatar} alt="avatar" />
        </div>
    );
}

export default Avatar;