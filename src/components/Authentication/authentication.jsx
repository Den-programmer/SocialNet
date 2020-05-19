import React from 'react';
import classes from './authentication.module.css';
import LoginContainer from './Login/loginContainer';

const Authentication = (props) => {
    return (
        <div className={classes.authentication}>
            <div className="container">
                <LoginContainer />
            </div>
        </div>
    );
}

export default Authentication;