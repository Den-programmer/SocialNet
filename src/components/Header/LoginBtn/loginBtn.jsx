import React from 'react';
import classes from './loginBtn.module.css';
import { NavLink } from 'react-router-dom';

const LoginBtn = ({isAuth, logout}) => {
    return (
        <div className={classes.btn_login}>
            {isAuth ? <NavLink onClick={logout} to="/login">Logout</NavLink> : <NavLink to='/login'>Login</NavLink>}
        </div>
    );
}


export default LoginBtn; 