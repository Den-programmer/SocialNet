import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './footLink.module.css';
 
interface FootLinkPropsType {
    id: number
    path: string
    name: string
}

const FootLink:React.FC<FootLinkPropsType> = ({path, name}) => {
    return (
        <li><NavLink className={classes.navLink} to={path}>{name}</NavLink></li>
    );
}

export default FootLink;