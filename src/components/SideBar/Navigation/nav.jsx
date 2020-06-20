import React from 'react';
import classes from './nav.module.css';
import SideBarNavLink from './SideBarNavLink/SideBarNavLink';

const Nav = ({navLinks}) => {
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