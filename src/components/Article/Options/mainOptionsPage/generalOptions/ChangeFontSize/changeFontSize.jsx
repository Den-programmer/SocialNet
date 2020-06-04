import React from 'react';
import classes from './changeFontSize.module.css';
import ChangeFontSizeSingleComponent from './ChangeFontSizeSingleComponent/changeFontSizeSingleComponent';

const ChangeFontSize = (props) => {
    let fontSizeValues = props.fontSizeValues.map(item => {
        return <ChangeFontSizeSingleComponent key={item.id} id={item.id} title={item.title} size={item.size} setFontSize={props.setFontSize}/>
    });
    return (
        <div className={classes.changeFontSize}>
            {fontSizeValues}
        </div>        
    );
}

export default ChangeFontSize;