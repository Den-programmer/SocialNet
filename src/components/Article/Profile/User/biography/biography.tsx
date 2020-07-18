import React from 'react'
import classes from './biography.module.css'

interface IBiography {
    biography: string
}

const Biography: React.FC<IBiography> = (props) => {
    return (
        <div className={classes.biography}>
            <div className={classes.aboutMe}>
                <h2>{props.biography ? "About Me:" : ''}</h2>
                <p>{props.biography}</p>
            </div>
        </div>
    )
}

export default Biography