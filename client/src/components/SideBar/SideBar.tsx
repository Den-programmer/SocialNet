import React from 'react'
import { navLinkType } from '../../types/SidebarTypes/sidebarTypes'
import { Drawer, List, makeStyles, Theme, createStyles, Divider, IconButton, useTheme } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SidebarItem from './SidebarItem/sidebarItem'
import { RouteComponentProps } from 'react-router-dom'
import { scrollToTop } from '../../utils/helpers/functions/function-helpers'

interface SideBarPropsType {
  navLinks: Array<navLinkType>
  isSidebarOpen: boolean
  sidebarWidth: number
  changeProfileNavItemChosenStatus: (itemId: number) => void
  changeSidebarIsOpenStatus: (status: boolean) => void
  choosePage: (isChosen: number) => void
}

const SideBar: React.FC<SideBarPropsType & RouteComponentProps> = (props) => {
  const drawerWidth = props.sidebarWidth
  const handleList = () => {
    setTimeout(() => {
      scrollToTop()
    }, 250)
  }
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
      }
    })
  )

  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerClose = () => props.changeSidebarIsOpenStatus(false)
  const navItems = props.navLinks.map(Link => {
    return <SidebarItem changeProfileNavItemChosenStatus={props.changeProfileNavItemChosenStatus} location={props.location.pathname} key={Link.id} id={Link.id} isChosen={Link.isChosen} name={Link.name} choosePage={props.choosePage} path={Link.path} icon={Link.icon}/>
  })
  return (
    <Drawer className={classes.drawer} variant="persistent" open={props.isSidebarOpen} classes={{ paper: classes.drawerPaper }}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List onClick={handleList} className={classes.nav}>
        {navItems}
      </List>
    </Drawer>
  )
}

export default SideBar