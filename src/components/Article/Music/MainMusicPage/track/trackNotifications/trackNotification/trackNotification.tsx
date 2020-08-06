import React from 'react'
import classes from './trackNotification.module.css'

interface TrackNotificationPropType {
    id: number
    title: string
    addTrackToPlaylist: (trackId: number, playlistId: number) => void
}

const TrackNotification: React.FC<TrackNotificationPropType> = (props) => {
    const chooseNotification = (e:React.MouseEvent<HTMLDivElement>) => {
        if(props.id === 1) {
            props.addTrackToPlaylist(props.id, 1)
        } 


        e.stopPropagation()
    }
    return <div onClick={chooseNotification} className={classes.notificationItem}><span>{props.title}</span></div>
}

export default TrackNotification