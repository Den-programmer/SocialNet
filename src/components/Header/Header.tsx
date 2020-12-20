import React from 'react'
import { AppBar, Container, Toolbar, IconButton, Box, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import EmailIcon from '@material-ui/icons/Email'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  isSidebarOpen: boolean
  isAuth: boolean
  drawerWidth: number
  logout(): void
  changeSidebarIsOpenStatus: (status: boolean) => void
}

const Header: React.FC<HeaderProps> = (props) => {
  const useStyles = makeStyles((theme: Theme) => createStyles({
    searchInput: {
      width: '320px'
    },
    headerIcons: {
      color: '#FFFFFF',
      margin: '0px 15px'
    },
    toolbarWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logButton: {
      fontWeight: 'bold'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: props.drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }))
  const classes = useStyles()
  return (
    <AppBar className={props.isSidebarOpen ? classes.appBarShift : classes.appBar} color="secondary" position="fixed">
      <Container>
        <Toolbar className={classes.toolbarWrapper}>
          <Box component="div">
            <IconButton onClick={() => props.changeSidebarIsOpenStatus(!props.isSidebarOpen)} edge="start" aria-label="menu" color="inherit" >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box component='div'>
            <NavLink className={classes.headerIcons} to="/Messages">
              <IconButton color="inherit" edge="start">
                <EmailIcon />
              </IconButton>
            </NavLink>
            <NavLink className={classes.headerIcons} to="/Notifications">
              <IconButton color="inherit" edge="start">
                <NotificationsIcon />
              </IconButton>
            </NavLink>
            {props.isAuth ? <NavLink onClick={props.logout} to="/login">
              <Button className={classes.logButton} variant="contained" color="primary">
                Logout
              </Button>
            </NavLink> :
              <NavLink to='/login'>
                <Button className={classes.logButton} variant="contained" color="primary">
                  Login
              </Button>
              </NavLink>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Header