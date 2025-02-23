import React from 'react'
import classes from './logo.module.css'
import { NavLink } from 'react-router-dom'

interface ILogo {}

const Logo:React.FC<ILogo> = (props) => {
    return (
        <div className={classes.logo}>
            <NavLink to="/">
                
            </NavLink>
        </div>
    )
}

export default Logo