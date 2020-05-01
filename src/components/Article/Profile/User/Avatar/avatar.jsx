import React from 'react';
import classes from './avatar.module.css';

const Avatar = (props) => {
    return (
        <div className={classes.avatar}>
            <img src={props.avatar} alt="avatar" />
            <div className={classes.name}>
                <h2>
                    {props.name}
                </h2>
            </div>
        </div>
    );
}

export default Avatar;