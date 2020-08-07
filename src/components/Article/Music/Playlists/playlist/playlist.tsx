import React from 'react'
import classes from './playlist.module.css'
import { trackType } from '../../../../../BLL/reducer-music'
import playlistWithoutUserImg from './img/playlist_default.jpg'

interface IPlaylist {
    id: number
    title: string
    countTracks: number
    music: Array<trackType>
}

const Playlist: React.FC<IPlaylist> = (props) => {
    const images = []
    const playlistImages = props.music.map((t: trackType) => {
        return <div key={t.id} className={classes.image}><img alt="images" src={t.singerPhoto} /></div>
    })
    for (let i = 0; i <= 3; i++) {
        images.push(playlistImages[i])
    }
    const countTracks = props.countTracks === 1 ? `${props.countTracks} track` : `${props.countTracks} tracks` 
    return (
        <React.Fragment>
            {props.music.length < 4 ? <li className={classes.playlist}>
                <div className={classes.playlistImg}>
                    <div className={classes.image}><img className={classes.playlistWithoutUserImg} src={playlistWithoutUserImg} alt=""/></div>
                </div>
                <div className={classes.playlistsInf}>
                    <h4>{props.title}</h4>
                    <p>{countTracks}</p>
                </div>
            </li> : <li className={classes.playlist}>
                <div className={classes.playlistImg}>
                    {images}
                </div>
                <div className={classes.playlistsInf}>
                    <h4>{props.title}</h4>
                    <p>{countTracks}</p>
                </div>
            </li>}
        </React.Fragment>
    )
}

export default Playlist