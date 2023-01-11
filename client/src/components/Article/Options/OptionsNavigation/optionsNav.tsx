import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'

interface PropsType { }

const useStyles = makeStyles((theme: Theme) => createStyles({
    navigationMenu: {
        borderRight: '1px solid #E3E3E3',
        width: '30%'
    },
    navTitle: {
        color: '#222222',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '25px'
    },
    navList: {
        width: '95%',
        paddingBottom: '15px',
        borderBottom: '1px solid #E3E3E3'
    },
    navIcon: {
        marginRight: theme.spacing(0.8),
        paddingLeft: '5px',
        color: '#222222'
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '10px 2px',
        borderRadius: '5px',
        width: '95%',
        '&:hover': {
            backgroundColor: '#EBEDF0'
        }
    },
    navItemActive: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '10px 2px',
        borderRadius: '5px',
    },
    navlink: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '16px',
        marginBlockStart: '0em',
        marginBlockEnd: '0em',
        '&:hover': {
            color: '#4DD3E9'
        }
    }
}))

const OptionsNav: React.FC<PropsType> = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.navigationMenu}>
            <div>
                <h2 className={classes.navTitle}>Options</h2>
            </div>
            <nav className={classes.navList}>
                <NavLink to="/Options/account" className={classes.navItem}>
                    <AccountBoxIcon  className={classes.navIcon}/>
                    <p className={classes.navlink}>My profile options</p>
                </NavLink>
                <NavLink to="/Options/general" className={classes.navItem}>
                    <SettingsApplicationsIcon className={classes.navIcon}/>
                    <p className={classes.navlink}>General options</p>
                </NavLink>
                <NavLink to="/Options/security" className={classes.navItem}>
                    <AccountBoxIcon  className={classes.navIcon}/>
                    <p className={classes.navlink}>Security options</p>
                </NavLink>
                <NavLink to="/Options/contacts" className={classes.navItem}>
                    <AccountBoxIcon  className={classes.navIcon}/>
                    <p className={classes.navlink}>Contacts options</p>
                </NavLink>
            </nav>
        </div>
    )
}

export default OptionsNav