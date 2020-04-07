import React from 'react';
import classes from './user.module.css';
import { NavLink } from 'react-router-dom';

const User = (props) => {

    let path = "/Messages/dialog" + props.id;

    return (
        <NavLink to={path}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    <img src={props.avatar} alt="user" />
                </div>
                <div className={classes.userInf}>
                    <h3 className={classes.userName}>{props.nickname}</h3>
                    <p className={classes.lastMessage}>{props.lastMessage}</p>
                </div>
            </div>
        </NavLink>
    );
}


export default User;