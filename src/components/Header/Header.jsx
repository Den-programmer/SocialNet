import React from 'react';
import classes from './Header.module.css';
import logo from './images/logo.png';
import { NavLink } from 'react-router-dom';
import Authentication from '../Authentication/authentication';
import { Route } from 'react-router-dom';

const Header = (props) => {
    return(
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <NavLink to="/">
              <img src={logo} alt="logo"/>
            </NavLink>
          </div>
          <div className={classes.btn_login}>
            {props.isAuth === 0 ? <NavLink onClick={props.logout} to="/login">Logout</NavLink> : <NavLink to='/login'>Login</NavLink>}     
          </div>
        </div>
        <Route exact path='/login' component={Authentication} />    
      </header>
    );
  }


export default Header;