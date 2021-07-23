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
import { singerType } from '../../../BLL/reducer-music'
import { useEffect } from 'react'

interface IAudio {
    currentTrack: trackType
    lastTrackId: number
    volume: number
    following: Array<singerType>
    likeTrack: (trackId: number) => void
    chooseTrack: (trackId: number) => void
    unsetIsMusicPlaying: () => void
    setVolume: (volume: number) => void
    setSingerFollewedStatus: (singerName: string) => void
}

const Audio: React.FC<IAudio> = ({ currentTrack, lastTrackId, volume, following, setSingerFollewedStatus, setVolume, likeTrack, chooseTrack, unsetIsMusicPlaying }) => {
    const [isVolumeHovered, setIsVolumeHoveredStatus] = useState<boolean>(false)
    const { id, isMusicPlaying, singer, singerPhoto, song, src, duration, time, liked } = currentTrack
    const prevId = id-1 === 0 ? lastTrackId : id-1 
    const nextId = id+1 > lastTrackId ? 1 : id+1
    const [isUserFollowed, setIsUserFollowedStatus] = useState<boolean>(false)
    useEffect(() => {
        following.forEach(item => {
            if(item.name === singer) {
                setIsUserFollowedStatus(item.followed)
            }
        })
    })
    return (
        <div className={classes.tagAudio}>
            <div className={classes.audio}>
                <div className={classes.mainControl}>
                    <SkipPreviousIcon onClick={() => chooseTrack(prevId)} className={classes.icon} />
                    {isMusicPlaying ? <PauseIcon onClick={unsetIsMusicPlaying} className={classes.icon} /> :
                        <PlayArrowIcon onClick={() => chooseTrack(id)} className={classes.icon} />}
                    <SkipNextIcon onClick={() => chooseTrack(nextId)} className={classes.icon} />
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
                    <div onMouseEnter={() => setIsVolumeHoveredStatus(true)} 
                    onMouseLeave={() => setIsVolumeHoveredStatus(false)} 
                    className={classes.volumeContainer}>
                        {volume === 0 ? <VolumeOffIcon onClick={() => setVolume(1)} className={classes.volumeIcon}/> 
                        :<VolumeUpIcon onClick={() => setVolume(0)} className={classes.volumeIcon}/>}
                        {isVolumeHovered && <div className={classes.volume}>
                            <input onChange={(e) => setVolume(Number(e.currentTarget.value))} value={volume} type="range" min="0" max="1" step="0.1" className={classes.volumeRange} />
                        </div>}
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
                        {isUserFollowed ? <FontAwesomeIcon onClick={() => setSingerFollewedStatus(singer)} className={classes.iconActive} icon={faUserCheck}/> 
                        : <FontAwesomeIcon onClick={() => setSingerFollewedStatus(singer)} className={classes.icon} icon={faUser}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Audio