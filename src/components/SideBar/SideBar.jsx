import React from 'react';
import classes from './SideBar.module.css';
import Nav from './Navigation/nav';
import FriendsContainer from './Friends/friendsContainer';
import { NavLink } from 'react-router-dom';

const SideBar = ({navLinks}) => {
  return (
    <div className={classes.menu}>
      <Nav navLinks={navLinks}/>
      <NavLink to="/Friends/DataFriends">
        <FriendsContainer />
      </NavLink>  
    </div>
  );
}

export default SideBar;