import React from 'react'
import classes from './generalOptions.module.css'
import ChangeFontSize from './ChangeFontSize/changeFontSize'
import GeneralOptionsTitle from './GeneralOptionsTitle/generalOptionsTitle'
import { fontSizeObjectType } from '../../../../../types/AppTypes/appTypes'

interface GeneralOptionsPropsType {
    fontSizeValues: Array<fontSizeObjectType>
    setFontSize: (id: number) => void
}

const GeneralOptions:React.FC<GeneralOptionsPropsType> = (props) => {
    return (
        <div className={classes.generalOptions}>
            <GeneralOptionsTitle />
            <ChangeFontSize setFontSize={props.setFontSize} fontSizeValues={props.fontSizeValues}/>
        </div>
    )
}

export default GeneralOptions