import React from 'react';
import classes from './generalOptions.module.css';
import ChangeFontSize from './ChangeFontSize/changeFontSize';
import GeneralOptionsTitle from './GeneralOptionsTitle/generalOptionsTitle';

const GeneralOptions = (props) => {
    return (
        <div className={classes.generalOptions}>
            <GeneralOptionsTitle />
            <ChangeFontSize setFontSize={props.setFontSize} fontSizeValues={props.fontSizeValues}/>
        </div>
    );
}

export default GeneralOptions;