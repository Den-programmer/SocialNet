import React from 'react'
import classes from './trackNotification.module.css'

interface TrackNotificationPropType {
    id: number
    title: string
}

const TrackNotification: React.FC<TrackNotificationPropType> = ({title, id}) => {
    let chooseNotification = (e:React.MouseEvent<HTMLDivElement>) => {
        if(e.currentTarget) alert(id)
        e.stopPropagation()
    }
    return <div onClick={chooseNotification} className={classes.notificationItem}>{title}</div>
}

export default TrackNotification;