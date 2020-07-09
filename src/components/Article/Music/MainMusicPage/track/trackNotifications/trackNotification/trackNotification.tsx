import React from 'react'
import classes from './trackNotification.module.css'

interface TrackNotificationPropType {
    id: number
    title: string
}

const TrackNotification: React.FC<TrackNotificationPropType> = ({title}) => {
    return (
        <div className={classes.notificationItem}>
            <h6>{title}</h6>
        </div>
    )
}

export default TrackNotification;