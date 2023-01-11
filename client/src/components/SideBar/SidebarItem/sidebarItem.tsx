import React, { ComponentType, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ListItem, ListItemText, makeStyles, createStyles, Theme } from '@material-ui/core'

interface ISidebarItem {
    id: number
    path: string
    isChosen: boolean
    name: string
    icon: ComponentType
    location: string
    choosePage: (linkId: number) => void
    changeProfileNavItemChosenStatus: (itemId: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    navItemWrapper: {
        width: '100%',
        '&:hover': {
            transition: 'all .5s linear',
            backgroundColor: '#222F40'
        }
    },
    ActiveNavItemWrapper: {
        width: '100%',
        backgroundColor: '#222F40'
    },
    navItem: {
        display: 'flex',
        justifyContent: 'right',
        borderBottom: '1px solid #45576D',
        padding: theme.spacing(2, 0),
        marginLeft: '20px'
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        color: '#366076',
        width: '100%'
    },
    navLinkIcon: {
        color: '#FFFFFF',
        fontSize: '15px'
    },
    navLink_text: {
        color: '#FFFFFF',
        margin: theme.spacing(0, 1),
        fontSize: '15px'
    }
}))

const SidebarItem: React.FC<ISidebarItem> = (props) => {
    useEffect(() => {
        if(props.path === props.location) {
            props.choosePage(props.id)
            props.changeProfileNavItemChosenStatus(props.id)
        }
    }, [])
    const classes = useStyles()
    return (
        <NavLink className={classes.navLink} to={props.path}><div onClick={() => props.choosePage(props.id)}
            className={props.isChosen ? classes.ActiveNavItemWrapper : classes.navItemWrapper}>
            <ListItem className={classes.navItem}>
                <props.icon />
                <ListItemText className={classes.navLink_text}>{props.name}</ListItemText>
            </ListItem>
        </div></NavLink>
    )
}

export default SidebarItem