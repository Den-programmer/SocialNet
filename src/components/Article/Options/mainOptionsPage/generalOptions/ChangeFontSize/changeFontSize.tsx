import React from 'react'
import classes from './changeFontSize.module.css'
import ChangeFontSizeSingleComponent from './ChangeFontSizeSingleComponent/changeFontSizeSingleComponent'
import { fontSizeObjectType } from '../../../../../../types/AppTypes/appTypes'

interface ChangeFontSizePropsType {
    fontSizeValues: Array<fontSizeObjectType>
    setFontSize: (id: number) => void
}

const ChangeFontSize:React.FC<ChangeFontSizePropsType> = (props) => {
    const fontSizeValues = props.fontSizeValues.map((item: fontSizeObjectType) => {
        return <ChangeFontSizeSingleComponent key={item.id} id={item.id} title={item.title} size={item.size} setFontSize={props.setFontSize}/>
    })
    return (
        <div className={classes.changeFontSize}>
            {fontSizeValues}
        </div>        
    )
}

export default ChangeFontSize