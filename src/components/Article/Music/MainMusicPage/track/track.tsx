import React from 'react'
import classes from './track.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faHeart } from '@fortawesome/free-solid-svg-icons'
import TrackNotifications from './trackNotifications/trackNotifications'
import { trackNotificationType } from '../../../../../BLL/reducer-music'

interface TrackPropsType {
    id: number
    singer: string
    singerPhoto: string
    songTitle: string
    duration: number
    liked: boolean
    isMusicPlaying: boolean
    trackNotifications: Array<trackNotificationType>
    likeTrack: (trackId: number) => void
    chooseTrack: (trackId: number) => void
}

class Track extends React.Component<TrackPropsType> {
    audio = new Audio

    chooseTrack = (): void => {
        // Turn the control
        this.props.chooseTrack(this.props.id)
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
                        <TrackNotifications trackNotifications={this.props.trackNotifications}/>
                    </div>
                    
                </div>
            </li>
        )
    }
}

export default Track;