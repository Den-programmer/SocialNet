import React from 'react'
import classes from './logo.module.css'
import logo from '../../../images/logo/React_logo.svg'
import { NavLink } from 'react-router-dom'

interface ILogo {}

const Logo:React.FC<ILogo> = (props) => {
    return (
        <div className={classes.logo}>
            <NavLink to="/">
                <img src={logo} alt="logo" />
            </NavLink>
        </div>
    )
}

export default Logo