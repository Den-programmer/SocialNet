import React from 'react';
import classes from './SideBar.module.css';
import Nav from './Navigation/nav';
import FriendsContainer from './Friends/friendsContainer';

const SideBar = ({navLinks}) => {
  return (
    <div className={classes.menu}>
      <Nav navLinks={navLinks}/>
      <FriendsContainer />
    </div>
  );
}

export default SideBar;