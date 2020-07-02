import React from 'react';
import classes from './SideBar.module.css';
import Nav from './Navigation/nav';
import FriendsContainer from './Friends/friendsContainer';
import { navLinkType } from '../../types/SidebarTypes/sidebarTypes';

interface SideBarPropsType {
  navLinks: Array<navLinkType>
}

const SideBar:React.FC<SideBarPropsType> = ({navLinks}) => {
  return (
    <div className={classes.menu}>
      <Nav navLinks={navLinks}/>
      <FriendsContainer />
    </div>
  );
}

export default SideBar;