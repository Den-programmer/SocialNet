import React from 'react'
import classes from './playlist.module.css'
import { trackType } from '../../../../../BLL/reducer-music'

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
    for(let i = 0; i<=3; i++) {
        images.push(playlistImages[i])
    }
    return (
        <li className={classes.playlist}>
            <div className={classes.playlistImg}>
                {images}
            </div>
            <div className={classes.playlistsInf}>
                <h4>{props.title}</h4>
                <p>{props.countTracks}</p>
            </div>
        </li>
    )
}

export default Playlist