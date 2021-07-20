import React, { useState } from 'react'
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
import { trackType } from '../../../types/MusicTypes/musicTypes'

interface IAudio {
    currentTrack: trackType
    lastTrackId: number
    likeTrack: (trackId: number) => void
    chooseTrack: (trackId: number) => void
    unsetIsMusicPlaying: () => void
}

const Audio: React.FC<IAudio> = ({ currentTrack, lastTrackId, likeTrack, chooseTrack, unsetIsMusicPlaying }) => {
    const { id, isMusicPlaying, singer, singerPhoto, song, src, duration, time, liked } = currentTrack
    return (
        <div className={classes.tagAudio}>
            <div className={classes.audio}>
                <div className={classes.mainControl}>
                    <SkipPreviousIcon className={classes.icon} />
                    {isMusicPlaying ? <PauseIcon onClick={unsetIsMusicPlaying} className={classes.icon} /> :
                        <PlayArrowIcon onClick={() => chooseTrack(id)} className={classes.icon} />}
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
                            <img src={singerPhoto ? singerPhoto : playlist_default} alt="singer" />
                        </div>
                        <div className={classes.trackInf}>
                            <p className={classes.trackName}>{song}</p>
                            <p className={classes.singerName}>{singer}</p>
                        </div>
                    </div>
                    <div className={classes.panel}>
                        {liked ? <FontAwesomeIcon onClick={() => likeTrack(id)} className={classes.iconActive} icon={faHeart}/>
                        : <FontAwesomeIcon onClick={() => likeTrack(id)} className={classes.icon} icon={faHeart}/>}
                        <FontAwesomeIcon className={classes.icon} icon={faUser}/>
                        {/* <FontAwesomeIcon className={classes.iconActive} icon={faUserCheck}/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Audio