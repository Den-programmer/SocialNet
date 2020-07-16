import React from 'react'
import classes from './generalOptionsTitle.module.css'

interface PropsType {}

const GeneralOptionsTitle:React.FC<PropsType> = ({}) => {
    return (
        <div className={classes.title}>
            <h2>General Options</h2>
        </div>
    )
}

export default GeneralOptionsTitle; 