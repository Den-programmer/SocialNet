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
    const tracks = props.tracks.map((track:trackType) => {
        return <Track key={track.id} 
                      id={track.id} 
                      singer={track.singer} 
                      singerPhoto={track.singerPhoto} 
                      songTitle={track.song} 
                      duration={track.duration}
                      liked={track.liked} 
                      isMusicPlaying={track.isMusicPlaying}
                      likeTrack={props.likeTrack}
                      chooseTrack={props.chooseTrack}
                      trackNotifications={props.trackNotifications}/>
    })
    
    const search = React.createRef<HTMLInputElement>();

    const onSearchIconClick = () => {
        const node = search.current;
        if(node) node.focus();
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
                {tracks}
            </ul>
            <div className={classes.currentMusic}>
                <audio src="" controls /> 
            </div>  
        </div>
    )
}

export default MainMusicPage;