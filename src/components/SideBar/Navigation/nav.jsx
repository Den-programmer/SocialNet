import React from 'react';
import classes from './nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    return (
        <ul className={classes.nav}>
            <li className={classes.item}><NavLink to="/Profile">Profile</NavLink></li>
            <li className={classes.item}><NavLink to="/Messages">Messages</NavLink></li>
            <li className={classes.item}><NavLink to="/News">News</NavLink></li>
            <li className={classes.item}><NavLink to="/Music">Music</NavLink></li>
            <li className={classes.item}><NavLink to="/Options">Options</NavLink></li>
        </ul>
    );
}

export default Nav;