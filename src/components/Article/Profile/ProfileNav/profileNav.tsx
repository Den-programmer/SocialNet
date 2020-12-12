import React, { useEffect } from 'react'
import { Toolbar, makeStyles, createStyles, Theme, List, ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { profileNavItem } from '../../../../BLL/reducer-profile'

interface IProfileNav {
    profileNav: Array<profileNavItem>
    changeProfileNavItemChosenStatus: (itemId: number) => void
    setStandartProfileNavOptions: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    navigation: {
        backgroundColor: '#FAFAFA',
        padding: '0px 200px'
    },
    navList: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navListLink: {
        color: '#222222',
        textTransform: 'uppercase',
        fontWeight: 'bolder',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        '&:hover': {
            transition: 'all .1s linear',
            color: '#4dcadd'
        }
    },
    navListLinkActive: {
        color: '#4dcadd',
        textTransform: 'uppercase',
        fontWeight: 'bolder',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px'
    },
    navListItem: {
        '&:hover': {
            borderBottom: '1px solid #4dcadd'
        }
    },
    navListItemActive: {
        borderBottom: '1px solid #4dcadd'
    }
}))

const ProfileNav: React.FC<IProfileNav> = ({ profileNav, changeProfileNavItemChosenStatus, setStandartProfileNavOptions }) => {
    useEffect(() => {
        setStandartProfileNavOptions()
    }, [])
    const classes = useStyles()
    const navItems = profileNav.map((item: profileNavItem) => {
        return (
            <NavLink onClick={() => changeProfileNavItemChosenStatus(item.id)} key={item.id} className={item.isChosen ? classes.navListLinkActive : classes.navListLink} to={item.path}>
                <ListItem className={item.isChosen ? classes.navListItemActive : classes.navListItem}>
                    <ListItemText>{item.title}</ListItemText>
                </ListItem>
            </NavLink>
        )
    })
    return (
        <Toolbar className={classes.navigation}>
            <List className={classes.navList}>
                {navItems}
            </List>
        </Toolbar>
    )
}

export default ProfileNav