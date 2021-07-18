import React from 'react'
import classes from './audio.module.scss'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import RepeatIcon from '@material-ui/icons/Repeat'
import playlist_default from '../../Article/Music/Playlists/playlist/img/playlist_default.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faRandom, faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'

interface IAudio {
    songTitle: string
    singerName: string
    singerPhoto: string | null
    isMusicPlaying: boolean
}

const Audio: React.FC<IAudio> = (props) => {
    // There're must be function of audio that change redux-state!
    return (
        <div className={classes.tagAudio}>
            <div className={classes.audio}>
                <div className={classes.mainControl}>
                    <SkipPreviousIcon className={classes.icon} />
                    {props.isMusicPlaying ? <PauseIcon className={classes.icon} /> :
                        <PlayArrowIcon className={classes.icon} />}
                    <SkipNextIcon className={classes.icon} />
                    <FontAwesomeIcon className={classes.icon} icon={faRandom} />
                    <RepeatIcon className={classes.icon} />
                </div>
                <div className={classes.audioProgressAndVolume}>
                    <div className={classes.songDriving}>
                        <div className={classes.startTime}>
                            0:00
                        </div>
                        <div className={classes.unloadProgress}></div>
                        <div className={classes.endTime}>
                            3:41
                        </div>
                    </div>
                    <div className={classes.volumeContainer}>
                        <VolumeUpIcon className={classes.icon}/>
                    </div>
                </div>
                <div className={classes.trackPanel}>
                    <div className={classes.track}>
                        <div className={classes.singerPhoto}>
                            <img src={props.singerPhoto ? props.singerPhoto : playlist_default} alt="singer" />
                        </div>
                        <div className={classes.trackInf}>
                            <p className={classes.trackName}>{props.songTitle}</p>
                            <p className={classes.singerName}>{props.singerName}</p>
                        </div>
                    </div>
                    <div className={classes.panel}>
                        <FontAwesomeIcon className={classes.icon} icon={faHeart}/>
                        <FontAwesomeIcon className={classes.icon} icon={faUser}/>
                        {/* <FontAwesomeIcon className={classes.icon} icon={faUserCheck}/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Audio