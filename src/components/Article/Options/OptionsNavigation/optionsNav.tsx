import React from 'react'
import s from './optionsNav.module.css'
import { NavLink } from 'react-router-dom'

interface PropsType {}

const OptionsNav:React.FC<PropsType> = ({}) => {
    return (
        <nav className={s.navigation}>
            <div className={s.navItem + ' ' + s.myProfileOptionsLinkNav}>
                <NavLink to="/Options/account">My profile options</NavLink>
            </div>
            <div className={s.navItem + ' ' + s.generalOptionsLinkNav}>
                <NavLink to="/Options/general">General options</NavLink>
            </div>
        </nav>
    )
}

export default OptionsNav