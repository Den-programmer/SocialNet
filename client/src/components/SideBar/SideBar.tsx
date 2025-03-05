import React from 'react';
import { Drawer, List, Divider, IconButton, useTheme, useMediaQuery, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SidebarItem from './SidebarItem/sidebarItem';
import { RouteComponentProps } from 'react-router-dom';
import { scrollToTop } from '../../utils/helpers/functions/function-helpers';

interface SideBarPropsType {
  navLinks: Array<any>;
  isSidebarOpen: boolean;
  sidebarWidth: number;
  changeProfileNavItemChosenStatus: (itemId: number) => void;
  changeSidebarIsOpenStatus: (status: boolean) => void;
  choosePage: (isChosen: number) => void;
}

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    backgroundColor: '#30445C',
    overflow: 'hidden',
    width: (props: { drawerWidth: string }) => props.drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
}));

const SideBar: React.FC<SideBarPropsType & RouteComponentProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const drawerWidth = isMobile ? '100vw' : `${props.sidebarWidth}px`;
  const classes = useStyles({ drawerWidth });

  const handleDrawerClose = () => {
    props.changeSidebarIsOpenStatus(false);
  }
  const handleListClick = () => {
    setTimeout(() => {
      scrollToTop();
      if (isMobile) handleDrawerClose();
    }, 250);
  };

  return (
    <Drawer
      open={props.isSidebarOpen}
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      onClose={handleDrawerClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List onClick={handleListClick}>
        {props.navLinks.map((link) => (
          <SidebarItem 
            key={link.id} 
            id={link.id} 
            isChosen={link.isChosen} 
            name={link.name} 
            choosePage={props.choosePage} 
            path={link.path} 
            icon={link.icon} 
            changeProfileNavItemChosenStatus={props.changeProfileNavItemChosenStatus}
            location={props.location.pathname} 
          />
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar