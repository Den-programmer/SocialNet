import React from 'react';
import classes from './errorPage.module.css';

const ErrorPage:React.FC<{}> = (props) => {
    return (
        <div className={classes.errorPage}>
            <h1>404 NOT FOUND!</h1>
        </div>
    );
}

export default ErrorPage;