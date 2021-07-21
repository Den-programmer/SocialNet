import React, { useEffect } from 'react'
import classes from './mainMusicPage.module.css'
import { trackType } from '../../../../types/MusicTypes/musicTypes'
import Track from './track/trackContainer'
import Audio from '../../../common/audio/audioContain'
import TracksSearching from './tracksSearching/tracksSearching'

export interface IMainMusicPageProps {
    tracks: Array<trackType>
    currentTrack: trackType
    volume: number
    setTrackCurrentTime: (trackId: number, time: number) => void
    unsetIsMusicPlaying: () => void
}

const MainMusicPage: React.FC<IMainMusicPageProps> = (props) => {
    const audio = React.createRef<HTMLAudioElement>()
    useEffect(() => {
        let node = audio.current
        if(node) {
            node.volume = props.volume
        }
        setTimeout(() => {
            let node = audio.current
            if (props.currentTrack.isMusicPlaying && node) {
                node.src = props.currentTrack.src
                node.currentTime = props.currentTrack.time
                node.play()
            } else {
                // Clean the state!
            }
        })
    })

    // В таком случае остаеться только починить редьюсеры

    const toggleMusicStatus = () => {
        if (!props.currentTrack.isMusicPlaying) {
            onPlay()
        } else {
            setTimeout(() => onPause())
        }
    }

    const onPlay = () => {
        let node = audio.current
        if (node) {
            node.src = props.currentTrack.src
            node.currentTime = props.currentTrack.time
            node.play()
        }
    }
    const onPause = () => {
        let node = audio.current
        if (props.currentTrack.isMusicPlaying && node) {
            let time = node.currentTime
            console.log(time)
            props.setTrackCurrentTime(props.currentTrack.id, time)
            props.unsetIsMusicPlaying()
        }
    }

    const tracks = props.tracks.map((track: trackType) => {
        return <Track key={track.id}
            id={track.id}
            singer={track.singer}
            singerPhoto={track.singerPhoto}
            songTitle={track.song}
            src={track.src}
            time={track.time}
            duration={track.duration}
            liked={track.liked}
            isMusicPlaying={track.isMusicPlaying} toggleMusicStatus={toggleMusicStatus} />
    })

    return (
        <div className={classes.mainMusicPage}>
            <TracksSearching />
            <ul className={classes.tracks}>
                {tracks.length !== 0 ? tracks : <h2 className={classes.titleWhenNoTracks}>There're no tracks yet!</h2>}
            </ul>
            {props.currentTrack.isMusicPlaying && <audio src="" ref={audio} />}
            <Audio />
        </div>
    )
}

export default MainMusicPage