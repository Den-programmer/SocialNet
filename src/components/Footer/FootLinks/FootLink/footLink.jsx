import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './footLink.module.css';

const FootLink = ({path, name}) => {
    return (
        <li><NavLink className={classes.navLink} to={path}>{name}</NavLink></li>
    );
}

export default FootLink;