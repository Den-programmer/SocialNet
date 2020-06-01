import React from 'react';
import classes from './changeFontSizeSingleComponent.module.css';

const ChangeFontSizeSingleComponent = (props) => {
    return (
        <div className={classes.fontSizeEqual + props.size}>
            <p>{props.title}</p>
            <button>{props.title}</button>
        </div>
    );
}

export default ChangeFontSizeSingleComponent;