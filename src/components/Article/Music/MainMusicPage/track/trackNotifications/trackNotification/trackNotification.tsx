import React from 'react'
import classes from './trackNotification.module.css'
// import { Modal } from '../../../../../../common/Modal/modal'
import { playlistType } from '../../../../../../../BLL/reducer-music'

interface TrackNotificationPropType {
    id: number
    title: string
    isModalOpen: boolean
    playlists: Array<playlistType>
    setIsModalOpenStatus: (modalStatus: boolean) => void
    addTrackToPlaylist: (trackId: number, playlistId: number) => void
}

const TrackNotification: React.FC<TrackNotificationPropType> = (props) => {
    const chooseNotification = (e:React.MouseEvent<HTMLDivElement>) => {
        if(props.id === 1) {
            // props.setIsModalOpenStatus(true)
        } 

        e.stopPropagation()
    }

    // const onSubmit = () => {
    //     props.addTrackToPlaylist(props.id, 1)
    //     props.setIsModalOpenStatus(false)
    // }
    // const onCancel = () => {
    //     props.setIsModalOpenStatus(false)
    // }

    return <div onClick={chooseNotification} className={classes.notificationItem}>
        <span>{props.title}</span>
        {/* {props.isModalOpen && <Modal isOpen={props.isModalOpen} title="Choosing playlist to add a new track" onCancel={onCancel} onSubmit={onSubmit}>
            Some content! 
        </Modal>} */}
    </div>
}

export default TrackNotification