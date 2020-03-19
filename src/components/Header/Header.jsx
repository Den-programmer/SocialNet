import React from 'react';
import classes from './Header.module.css';
import logo from './images/logo.png';

const Header = () => {
    return(
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={logo} alt="logo"/>
        </div>
      </header>
    );
  }


export default Header;