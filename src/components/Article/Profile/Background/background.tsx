import React from 'react'
import classes from './background.module.css'

interface IProfileBackground {}

const Background: React.FC<IProfileBackground> = (props) => {
    return(
        <div className={classes.background}></div>
    )
} 

export default Background