import React from 'react'
import classes from './audio.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import playlist_default from '../../Article/Music/Playlists/playlist/img/playlist_default.jpg'

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
            <div className={classes.singerPhoto}>
                <img src={props.singerPhoto ? props.singerPhoto : playlist_default} alt="" />
            </div>
            <div className={classes.playerBody}>
                <div className={classes.progressBars}>
                    <div className={classes.unloadProgress}></div>
                    <div className={classes.loadProgress}></div>
                </div>
                <div className={classes.control}>
                    <div className={classes.trackInf}>
                        <h4>{props.songTitle}</h4>
                        <p>{props.singerName}</p>
                    </div>
                    <div className={classes.btns}>
                        {props.isMusicPlaying && <FontAwesomeIcon className={"pauseIcon " + classes.m50} icon={faPause} />}
                        {!props.isMusicPlaying && <FontAwesomeIcon className={"playTrackIcon " + classes.m50} icon={faPlay} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Audio