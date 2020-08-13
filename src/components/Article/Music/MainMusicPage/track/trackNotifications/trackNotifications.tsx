import React, { useState } from 'react'
import classes from './trackNotifications.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { trackNotificationType, playlistType } from '../../../../../../BLL/reducer-music'
import TrackNotification from './trackNotification/trackNotification'

interface TrackNotificationsPropType {
    trackId: number
    playlists: Array<playlistType>
    isModalOpen: boolean
    trackNotifications: Array<trackNotificationType>
    setIsModalOpenStatus: (modalStatus: boolean) => void
    addTrackToPlaylist: (trackId: number, playlistId: number) => void
    ignoreTrack: (trackId: number) => void
}

const TrackNotifications: React.FC<TrackNotificationsPropType> = (props) => {
    const [isMenu, setIsMenuStatus] = useState<boolean>(false)

    const trackNotifications = props.trackNotifications.map((item: trackNotificationType) => {
        return <TrackNotification key={item.id} id={item.id} 
        title={item.title} addTrackToPlaylist={props.addTrackToPlaylist} 
        ignoreTrack={props.ignoreTrack}
        trackId={props.trackId}
        isModalOpen={props.isModalOpen} setIsModalOpenStatus={props.setIsModalOpenStatus} playlists={props.playlists}/>
    })

    const openMenu = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsMenuStatus(!isMenu)
        e.stopPropagation()
    }
        return (
            <div className={classes.notifications}>
                <div onClick={openMenu} className={classes.notificationIconBlock}>
                    <FontAwesomeIcon className={classes.notificationIcon} icon={faEllipsisV} />
                </div>
                {isMenu && <div className={classes.trackNotifications}>
                    {trackNotifications}
                </div>}
            </div>
        )
}

export default TrackNotifications