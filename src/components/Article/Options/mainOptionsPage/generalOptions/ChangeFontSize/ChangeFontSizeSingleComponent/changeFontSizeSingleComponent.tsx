import React from 'react'

interface PropsType {
    id: number
    title: string
    size: number
    setFontSize: (id: number) => void
}

const ChangeFontSizeSingleComponent:React.FC<PropsType> = (props) => {

    let changeAppFontSize = () => {
        props.setFontSize(props.id)
    }

    return (
        <div className={"fontSizeEqual" + props.size + " fontWeightBold"}>
            <p>{props.title}</p>
            <button onClick={changeAppFontSize}>{props.title}</button>
        </div>
    )
}


export default ChangeFontSizeSingleComponent