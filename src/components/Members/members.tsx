import React from 'react'
import classes from './members.module.scss'

interface IMembers {}

const Members: React.FC<IMembers> = (props) => {
    return (
        <div className={classes.members}>
            Members
        </div>
    )
}

export default Members