import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './noDialogs.module.scss'

interface INoDialogs {  }

const NoDialogs:React.FC<INoDialogs> = (props) => {
    return (
        <div className={classes.noDialogs}>
            <h3 className={classes.titleNoDialogs}>You have no dialogs yet!</h3>
            <div className={classes.btn_findDialogs}>
                <NavLink to='/Friends/FindUsers'>Find dialogs</NavLink>
            </div>
        </div>
    )
}

export default NoDialogs