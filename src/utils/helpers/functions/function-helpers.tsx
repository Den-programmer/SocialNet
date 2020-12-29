import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './help.module.scss'

export const createFriendsNavBtn = (hint: string, link: string, nameOfBtn: string) => {
    return (
        <NavLink title={hint} className={classes.friends_button} to={link}>
            {nameOfBtn}
        </NavLink>
    )
}