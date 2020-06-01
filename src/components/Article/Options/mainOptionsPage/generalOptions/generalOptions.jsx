import React from 'react';
import classes from './generalOptions.module.css';
import ChangeFontSize from './ChangeFontSize/changeFontSize';

const GeneralOptions = (props) => {
    return (
        <div className={classes.generalOptions}>
            <div className={classes.title}>
                <h2>General Options</h2>
            </div>
            <ChangeFontSize fontSizeValues={props.fontSizeValues}/>
        </div>
    );
}

export default GeneralOptions;