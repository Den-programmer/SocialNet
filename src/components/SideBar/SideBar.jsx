import React from 'react';
import classes from './SideBar.module.css';
import Nav from './Navigation/nav';
import FriendsContainer from './Friends/friendsContainer';
import { NavLink } from 'react-router-dom';

const SideBar = (props) => {
  return (
    <div className={classes.menu}>
      <Nav />
      <NavLink to="/Friends/DataFriends">
        <FriendsContainer />
      </NavLink>  
    </div>
  );
}

export default SideBar;