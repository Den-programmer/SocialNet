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
    startMusic: (isMusicPlaying: boolean, src: string, id: number, time: number) => void
    likeTrack: (trackId: number) => void
    chooseTrack: (trackId: number) => void
    addTrackToPlaylist: (trackId: number, playlistId: number) => void
    ignoreTrack: (trackId: number) => void
}

class Track extends React.Component<TrackPropsType> {
    chooseTrack = (): void => {
        this.props.chooseTrack(this.props.id)
        setTimeout(() => this.props.startMusic(this.props.isMusicPlaying, this.props.src, this.props.id, this.props.time))   
    }
    likeTrack = (event:React.MouseEvent<SVGSVGElement>): void => {
        this.props.likeTrack(this.props.id)
        event.stopPropagation()
    }
    render() {
        return (
            <li onClick={this.chooseTrack} className={classes.track}>
                <div className={classes.trackInf}>
                    <div className={classes.icon}>
                        <img src={this.props.singerPhoto} alt="singer" />
                    </div>
                    <div className={classes.Inf}>
                        <div className={classes.singer}>
                            <h4>{this.props.singer}</h4>
                        </div>
                        <div className={classes.songTitle}>
                            <h5>{this.props.songTitle}</h5>
                        </div>
                        <div className={classes.btns}>
                            {this.props.isMusicPlaying ? <FontAwesomeIcon className={classes.pauseIcon} icon={faPause} /> : 
                            <FontAwesomeIcon className={classes.playTrackIcon} icon={faPlay} />}
                            {this.props.liked ? <FontAwesomeIcon onClick={this.likeTrack} className={classes.likedIcon} icon={faHeart} /> :
                            <FontAwesomeIcon onClick={this.likeTrack} className={classes.likeIcon} icon={faHeart} />}
                        </div>
                    </div>
                </div>
                <div className={classes.durationAndNotifications}>
                    <div className={classes.duration}>
                        {this.props.duration}
                    </div>    
                    <TrackNotifications playlists={this.props.playlists} 
                    setIsModalOpenStatus={this.props.setIsModalOpenStatus} 
                    isModalOpen={this.props.isModalOpen}
                    addTrackToPlaylist={this.props.addTrackToPlaylist} 
                    trackNotifications={this.props.trackNotifications} 
                    ignoreTrack={this.props.ignoreTrack}
                    trackId={this.props.id}/>
                </div>
            </li>
        )
    }
}

export default Track