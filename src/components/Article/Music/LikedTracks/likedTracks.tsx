import React from 'react'
import classes from './likedTracks.module.css'
import { trackType, trackNotificationType } from '../../../../BLL/reducer-music'
// import Track from '../MainMusicPage/track/track';

interface LikedTracksPropsType {
    likedTracks: Array<trackType>
    trackNotifications: Array<trackNotificationType>
}

const LikedTracks:React.FC<LikedTracksPropsType> = (props) => {
    // let tracks = props.likedTracks.map((t:trackType) => {
    //     return <Track key={t.id} 
    //                   id={t.id} 
    //                   singer={t.singer} 
    //                   singerPhoto={t.singerPhoto} 
    //                   songTitle={t.song} 
    //                   src={t.src}
    //                   duration={t.duration}
    //                   liked={t.liked}
    //                   isMusicPlaying={t.isMusicPlaying} 
    //                   trackNotifications={props.trackNotifications}/>
    // })
    return (
        <div className={classes.likedTracks}>
            <div className={classes.title}>
                <h1>Liked Tracks!</h1>
            </div>
            <div className={classes.search}>
                <input type="text"/>
            </div>
            <div className={classes.mainPage}>
                {/* <ul className={classes.trackList}> 
                   {tracks}
                </ul> */}
            </div>
        </div>
    )
}

export default LikedTracks