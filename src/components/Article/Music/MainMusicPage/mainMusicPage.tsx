import React from 'react'
import classes from './mainMusicPage.module.css'
import { trackType, trackNotificationType } from '../../../../BLL/reducer-music'
import Track from './track/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface mainMusicPageProps {
    tracks: Array<trackType>
    trackNotifications: Array<trackNotificationType>
    likeTrack: (trackId: number) => void
    chooseTrack: (trackId: number) => void
}

const MainMusicPage:React.FC<mainMusicPageProps> = (props) => {
    const audio = React.createRef<HTMLAudioElement>()
    const search = React.createRef<HTMLInputElement>()

    let startMusic = (isMusicPlaying: boolean, src: string) => {
        if(isMusicPlaying) {
            let node = audio.current
            if(node) {
                node.src = src
                node.play()
            }
        } else {
            let node = audio.current
            if(node) {
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