import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ListItem, ListItemText } from '@material-ui/core'
import { useProfileNavStyles } from '../profileNav'

interface IProfileNavItem {
    id: number
    title: string
    isChosen: boolean
    path: string
    location: string
    changeProfileNavItemChosenStatus: (itemId: number) => void
    choosePage: (LinkId: number) => void
}

const ProfileNavItem: React.FC<IProfileNavItem> = (props) => {
    const classes = useProfileNavStyles()
    useEffect(() => {
        if (props.path === props.location) {
            props.choosePage(props.id)
            props.changeProfileNavItemChosenStatus(props.id)
        }
    }, [])
    return (
        <NavLink onClick={() => props.changeProfileNavItemChosenStatus(props.id)} key={props.id} className={props.isChosen ? classes.navListLinkActive : classes.navListLink} to={props.path}>
            <ListItem className={props.isChosen ? classes.navListItemActive : classes.navListItem}>
                <ListItemText>{props.title}</ListItemText>
            </ListItem>
        </NavLink>
    )
}

export default ProfileNavItem