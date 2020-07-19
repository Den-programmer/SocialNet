import React from 'react'
import classes from './mainMusicPage.module.css'
import { trackType, trackNotificationType } from '../../../../BLL/reducer-music'
import Track from './track/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export interface IMainMusicPageProps {
    tracks: Array<trackType>
    trackNotifications: Array<trackNotificationType>
    setTrackCurrentTime: (trackId: number, time: number) => void
    likeTrack: (trackId: number) => void
    chooseTrack: (trackId: number) => void
}

const MainMusicPage:React.FC<IMainMusicPageProps> = (props) => {
    const audio = React.createRef<HTMLAudioElement>()
    const search = React.createRef<HTMLInputElement>()

    let startMusic = (isMusicPlaying: boolean, src: string, id: number, time: number) => {
        let node = audio.current
        if(isMusicPlaying) {
            if(node) {
                node.src = src
                node.currentTime = time
                node.play()
            }
        } else {
            if(node) {
                let time = node.currentTime
                props.setTrackCurrentTime(id, time)
                node.pause()
            }
        }
    }
    const tracks = props.tracks.map((track:trackType) => {
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
                      trackNotifications={props.trackNotifications} startMusic={startMusic}/>
    })

    const onSearchIconClick = () => {
        const node = search.current
        if(node) node.focus()
    }

    return (
        <div className={classes.mainMusicPage}>
            <div className={classes.musicTitle}>
                <h1>Tracks for you!</h1>
            </div>
            <div className={classes.searchInput}>
                <FontAwesomeIcon title="Click to search!" onClick={onSearchIconClick} className={classes.searchIcon} icon={faSearch} />
                <input ref={search} type="text"/>
            </div>
            <ul className={classes.tracks}>
                {tracks.length !== 0 ? tracks : <h2 className={classes.titleWhenNoTracks}>There're no tracks yet!</h2>}
            </ul>
            <div className={classes.currentMusic}>
                <audio ref={audio} src="" className={classes.audioControler} controls /> 
            </div>  
        </div>
    )
}

export default MainMusicPage;