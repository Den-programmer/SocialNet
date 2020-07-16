import React from 'react'
import classes from './NOfriendsComponent.module.css'
import { NavLink }  from 'react-router-dom'

interface INoFriendsComponent {}

const NoFriendsComponent: React.FC<INoFriendsComponent> = (props) => {
    return (
        <div className={classes.noFriendsMessage}>
            <div className={classes.title}>
                Your friends and followings will be displayed here!
            </div>
            <div className={classes.redirectToFindUsers}>
                <NavLink to="/Friends/FindUsers">
                    Find friends!
                </NavLink>
            </div>
        </div>
    )
}

export default NoFriendsComponent