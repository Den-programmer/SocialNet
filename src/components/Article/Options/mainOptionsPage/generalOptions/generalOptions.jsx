import React from 'react';
import classes from './generalOptions.module.css';
import ChangeFontSize from './ChangeFontSize/changeFontSize';

const GeneralOptions = (props) => {
    return (
        <div className={classes.generalOptions}>
            <ChangeFontSize fontSizeValues={props.fontSizeValues}/>
        </div>
    );
}

export default GeneralOptions;