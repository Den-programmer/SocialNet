import React from 'react'
import classes from './following.module.css'

interface IFollowing {}

const Following: React.FC<IFollowing> = (props) => {
    return (
        <div className={classes.following}>
            <h1>In developing...</h1>
        </div>
    )
}

export default Following