import React from 'react';

const ChangeFontSizeSingleComponent = (props) => {

    let changeAppFontSize = () => {
        props.setFontSize(props.id);
    }

    return (
        <div id={props.id} className={"fontSizeEqual" + props.size + " fontWeightBold"}>
            <p>{props.title}</p>
            <button onClick={changeAppFontSize}>{props.title}</button>
        </div>
    );
}


export default ChangeFontSizeSingleComponent;