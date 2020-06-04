import React from 'react';

const ChangeFontSizeSingleComponent = (props) => {

    let changeAppFontSize = (e) => {
        let currentId = Number(e.currentTarget.parentNode.getAttribute("id"));
        props.setFontSize(currentId);
    }

    return (
        <div id={props.id} className={"fontSizeEqual" + props.size + ' ' + "fontWeightBold"}>
            <p>{props.title}</p>
            <button onClick={changeAppFontSize}>{props.title}</button>
        </div>
    );
}


export default ChangeFontSizeSingleComponent;