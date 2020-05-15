import React from 'react';
import classes from './authentication.module.css';
import Login from './Login/login';

const Authentication = (props) => {
    return (
        <div className={classes.authentication}>
            <div className="container">
                <Login />
            </div>
        </div>
    );
}

export default Authentication;