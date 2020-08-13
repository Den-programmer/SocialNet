import React, { useEffect } from 'react'
import classes from './mainMusicPage.module.css'
import { trackType, trackNotificationType, playlistType } from '../../../../BLL/reducer-music'
import Track from './track/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export interface IMainMusicPageProps {
    tracks: Array<trackType>
    trackNotifications: Array<trackNotificationType>
    isModalOpen: boolean
    playlists: Array<playlistType>
    setIsModalOpenStatus: (modalStatus: boolean) => void
    setTrackCurrentTime: (trackId: number, time: number) => void
    likeTrack: (trackId: number) => void
    unsetIsMusicPlaying: () => void
    chooseTrack: (trackId: number) => void
    addTrackToPlaylist: (trackId: number, playlistId: number) => void
    ignoreTrack: (trackId: number) => void
}

const MainMusicPage: React.FC<IMainMusicPageProps> = (props) => {
    const audio = React.createRef<HTMLAudioElement>()
    const search = React.createRef<HTMLInputElement>()

    useEffect(() => {
        let node = audio.current
        props.tracks.forEach((track: trackType) => {
            if (track.isMusicPlaying && node) {
                node.src = track.src
                node.currentTime = track.time
                node.play()
            }
        })
    })

    let startMusic = (isMusicPlaying: boolean, src: string, id: number, time: number) => {
        let node = audio.current
        // time - сохраняеться в state, если трек был остановлен!
        // Eсли компонента умирает - тогда сохраняем время играющего трека!
        if (isMusicPlaying) {
            if (node) {
                node.src = src
                node.currentTime = time
                node.play()
            }
        } else {
            if (node) {
                let time = node.currentTime
                props.setTrackCurrentTime(id, time)
                node.pause()
            }
        }
    }

    const onPlay = () => {
       // После запуска аудио - не очень хорошая идея что-то в нем изменять, но нужно!
    }
    const onPause = () => {
        let node = audio.current
        props.tracks.forEach((track: trackType) => {
            if(node && track.isMusicPlaying) {
                let time = node.currentTime
                node.id = track.id.toString()
                props.setTrackCurrentTime(track.id, time)
                props.unsetIsMusicPlaying()
            }
        })
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
            isMusicPlaying={track.isMusicPlaying}
            likeTrack={props.likeTrack}
            chooseTrack={props.chooseTrack}
            trackNotifications={props.trackNotifications} 
            startMusic={startMusic} 
            ignoreTrack={props.ignoreTrack}
            addTrackToPlaylist={props.addTrackToPlaylist}
            isModalOpen={props.isModalOpen} setIsModalOpenStatus={props.setIsModalOpenStatus} playlists={props.playlists}/>
    })

    const onSearchIconClick = () => {
        const node = search.current
        if (node) node.focus()
    }

    return (
        <div className={classes.mainMusicPage}>
            <div className={classes.musicTitle}>
                <h1>Tracks for you!</h1>
            </div>
            <div className={classes.searchInput}>
                <FontAwesomeIcon title="Click to search!" onClick={onSearchIconClick} className={classes.searchIcon} icon={faSearch} />
                <input ref={search} type="text" />
            </div>
            <ul className={classes.tracks}>
                {tracks.length !== 0 ? tracks : <h2 className={classes.titleWhenNoTracks}>There're no tracks yet!</h2>}
            </ul>
            <div className={classes.currentMusic}>
                <audio onPlay={onPlay} onPause={onPause} ref={audio} src="" className={classes.audioControler} controls />
            </div>
        </div>
    )
}

export default MainMusicPage