import React from 'react';
import classes from './logo.module.css';
import logo from './images/logo.png';
import { NavLink } from 'react-router-dom';

const Logo = (props) => {
    return (
        <div className={classes.logo}>
            <NavLink to="/">
                <img src={logo} alt="logo" />
            </NavLink>
        </div>
    );
}

export default Logo; 