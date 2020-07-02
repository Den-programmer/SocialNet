import React from 'react';
import classes from './nav.module.css';
import SideBarNavLink from './SideBarNavLink/SideBarNavLink';
import { navLinkType } from '../../../types/SidebarTypes/sidebarTypes';

interface NavLinksType {
    navLinks: Array<navLinkType>
}

const Nav:React.FC<NavLinksType> = ({navLinks}) => {
    let Links = navLinks.map(Link => {
        return <SideBarNavLink key={Link.id} path={Link.path} linkName={Link.name}/>
    });

    return (
        <ul className={classes.nav}>
           {Links}
        </ul>
    );
}

export default Nav;