import React from 'react';
import classes from './SideBar.module.css';
import Nav from './Navigation/nav';
import Friends from './Friends/friends';
import { NavLink } from 'react-router-dom';

const SideBar = (props) => {
  return (
    <div className={classes.menu}>
      <Nav />
      <NavLink to="/Friends">
        <Friends Friends={props.Friends}/>
      </NavLink>  
    </div>
  );
}

export default SideBar;