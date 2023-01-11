import React from 'react'
import { Toolbar, makeStyles, createStyles, Theme, List } from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import { profileNavItem } from '../../../../types/ProfileTypes/profileTypes'
import ProfileNavItem from './profileNavItem/profileNavItem'

interface IProfileNav {
    profileNav: Array<profileNavItem>
    changeProfileNavItemChosenStatus: (itemId: number) => void
    setStandartProfileNavOptions: () => void
    choosePage: (LinkId: number) => void
}

export const useProfileNavStyles = makeStyles((theme: Theme) => createStyles({
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

const ProfileNav: React.FC<IProfileNav & RouteComponentProps> = (props) => {
    const classes = useProfileNavStyles()
    const navItems = props.profileNav.map((item: profileNavItem) => {
        return (
            <ProfileNavItem choosePage={props.choosePage} location={props.location.pathname} changeProfileNavItemChosenStatus={props.changeProfileNavItemChosenStatus} key={item.id} id={item.id} title={item.title} isChosen={item.isChosen} path={item.path}/>
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