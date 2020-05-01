import React from 'react';
import classes from './biography.module.css';

const Biography = (props) => {
    return (
        <div className={classes.biography}>
            <div className={classes.aboutMe}>
                <h2>About Me:</h2>
                <p>{props.biography}</p>
            </div>
        </div>
    );
}

export default Biography;