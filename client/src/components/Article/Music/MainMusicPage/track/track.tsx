import React from 'react'
import classes from './track.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faHeart } from '@fortawesome/free-solid-svg-icons'
import TrackNotifications from './trackNotifications/trackNotifications'
import { trackNotificationType, playlistType } from '../../../../../BLL/reducer-music'

interface TrackPropsType {
    id: number
    singer: string
    singerPhoto: string
    songTitle: string
    time: number
    duration: number
    liked: boolean
    src: string
    isMusicPlaying: boolean
    trackNotifications: Array<trackNotificationType>
    isModalOpen: boolean
    playlists: Array<playlistType>
    setIsModalOpenStatus: (modalStatus: boolean) => void
    setCurrentTrack: (trackId: number) => void
    likeTrack: (trackId: number) => void
    toggleMusicStatus: () => void
    chooseTrack: (trackId: number) => void
    addTrackToPlaylist: (trackId: number, playlistId: number) => void
    ignoreTrack: (trackId: number) => void
}

const Track: React.FC<TrackPropsType> = (props) => {
    const chooseTrack = (): void => {
        props.chooseTrack(props.id)
        props.setCurrentTrack(props.id)
        setTimeout(() => props.toggleMusicStatus())
    }
    const likeTrack = (event: React.MouseEvent<SVGSVGElement>): void => {
        props.likeTrack(props.id)
        event.stopPropagation()
    }
    console.log(props.isMusicPlaying)
    return (
        <li onClick={chooseTrack} className={classes.track}>
            <div className={classes.trackInf}>
                <div className={classes.icon}>
                    <img src={props.singerPhoto} alt="singer" />
                </div>
                <div className={classes.Inf}>
                    <div className={classes.singer}>
                        <h4>{props.singer}</h4>
                    </div>
                    <div className={classes.songTitle}>
                        <h5>{props.songTitle}</h5>
                    </div>
                    <div className={classes.btns}>
                        {props.isMusicPlaying ? <FontAwesomeIcon className="pauseIcon" icon={faPause} /> :
                            <FontAwesomeIcon className="playTrackIcon" icon={faPlay} />}
                        {props.liked ? <FontAwesomeIcon onClick={likeTrack} className={classes.likedIcon} icon={faHeart} /> :
                            <FontAwesomeIcon onClick={likeTrack} className={classes.likeIcon} icon={faHeart} />}
                    </div>
                </div>
            </div>
            <div className={classes.durationAndNotifications}>
                <div className={classes.duration}>
                    {props.duration}
                </div>
                <TrackNotifications playlists={props.playlists}
                    setIsModalOpenStatus={props.setIsModalOpenStatus}
                    isModalOpen={props.isModalOpen}
                    addTrackToPlaylist={props.addTrackToPlaylist}
                    trackNotifications={props.trackNotifications}
                    ignoreTrack={props.ignoreTrack}
                    trackId={props.id} />
            </div>
        </li>
    )
}

export default Track