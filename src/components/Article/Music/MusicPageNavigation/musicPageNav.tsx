import React from 'react'
import classes from './musicPageNav.module.css'
import { navLinkType } from '../../../../BLL/reducer-music'
import MusicPageNavLink from './musicPageNavLink/musicPageNavLink'

interface MusicNavigationPropsType {
    navLinks: Array<navLinkType>
}

const MusicPageNav:React.FC<MusicNavigationPropsType> = (props) => {
    let navLinks = props.navLinks.map((link:navLinkType) => {
        return <MusicPageNavLink key={link.id} id={link.id} title={link.title} path={link.path}/>
    })
    return (
        <nav className={classes.nav}>
            <ul className={classes.list}>
               {navLinks}
            </ul>
        </nav>
    );
}

export default MusicPageNav;