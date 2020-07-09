import React from 'react'
import classes from './musicPageNavLink.module.css'
import { NavLink } from 'react-router-dom'

interface navLinkPropsType {
    id: number
    title: string
    path: string
}   

const MusicPageNavLink:React.FC<navLinkPropsType> = ({title, path}) => {
    return <li className={classes.listItem}><NavLink to={path}>{title}</NavLink></li>
}

export default MusicPageNavLink;