import React from 'react';
import classes from './SideBar.module.css';
import Nav from './Navigation/nav';
import Friends from './Friends/friends';

const SideBar = (props) => {
  return (
    <div className={classes.menu}>
      <Nav />
      <Friends state={props.state}/>
    </div>
  );
}

export default SideBar;