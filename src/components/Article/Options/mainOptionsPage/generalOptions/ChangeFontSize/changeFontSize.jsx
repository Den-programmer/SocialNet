import React from 'react';
import classes from './changeFontSize.module.css';
import ChangeFontSizeSingleComponent from './ChangeFontSizeSingleComponent/changeFontSizeSingleComponent';

const ChangeFontSize = (props) => {
    let fontSizeValues = props.fontSizeValues.map(item => {
        return <ChangeFontSizeSingleComponent title={item.title} size={item.size}/>
    });
    return (
        <div className={classes.changeFontSize}>
            {fontSizeValues}
        </div>        
    );
}

export default ChangeFontSize;