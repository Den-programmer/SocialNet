import React from 'react'
import { navLinkType } from '../../types/SidebarTypes/sidebarTypes'
import { Drawer, List, makeStyles, Theme, createStyles, Divider, IconButton, useTheme, ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

interface SideBarPropsType {
  navLinks: Array<navLinkType>
  isSidebarOpen: boolean
  sidebarWidth: number
  changeSidebarIsOpenStatus: (status: boolean) => void
  choosePage: (isChosen: number) => void
}

const SideBar: React.FC<SideBarPropsType> = ({ navLinks, isSidebarOpen, changeSidebarIsOpenStatus, choosePage, sidebarWidth }) => {
  const drawerWidth = sidebarWidth

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawer: {
        width: '0px',
        flexShrink: 0,
        backgroundColor: 'red'
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#30445C',
        overflow: 'hidden'
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
      },
      nav: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
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
    })
  )

  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerClose = () => changeSidebarIsOpenStatus(false)
  const navItems = navLinks.map(Link => {
    return <NavLink key={Link.id} className={classes.navLink} to={Link.path}><div onClick={() => choosePage(Link.id)}
      className={Link.isChosen ? classes.ActiveNavItemWrapper : classes.navItemWrapper}>
      <ListItem className={classes.navItem}>
        <Link.icon />
        <ListItemText className={classes.navLink_text}>{Link.name}</ListItemText>
      </ListItem></div></NavLink>
  })
  return (
    <Drawer className={classes.drawer} variant="persistent" open={isSidebarOpen} classes={{ paper: classes.drawerPaper }}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List className={classes.nav}>
        {navItems}
      </List>
    </Drawer>
  )
}

export default SideBar