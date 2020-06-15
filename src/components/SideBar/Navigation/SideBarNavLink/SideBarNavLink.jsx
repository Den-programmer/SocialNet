import React from 'react';
import classes from './SideBarNavLink.module.css';
import { NavLink } from 'react-router-dom';

const SideBarNavLink = ({path, linkName}) => {
    return (
        <li className={classes.item}><NavLink to={path}>{linkName}</NavLink></li>
    );
}

export default SideBarNavLink;