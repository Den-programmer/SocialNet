import React from 'react';
import classes from './SideBar.module.css';
import Nav from './Navigation/nav';
import Friends from './Friends/friends';

const SideBar = (props) => {
  return (
    <div className={classes.menu}>
      <Nav />
      <Friends Friends={props.Friends}/>
    </div>
  );
}

export default SideBar;