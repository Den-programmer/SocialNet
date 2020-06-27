import React from 'react';
import classes from './errorPage.module.css';

const ErrorPage = (props) => {
    return (
        <div className={classes.errorPage}>
            <h1>404 NOT FOUND!</h1>
        </div>
    );
}

export default ErrorPage;