import React from 'react'
import classes from './playlists.module.css'
import { playlistType } from '../../../../BLL/reducer-music'
import Playlist from './playlist/playlist'

interface IPlaylists {
    playlists: Array<playlistType>
}

const Playlists: React.FC<IPlaylists> = ({ playlists }) => {
    const Playlists = playlists.map((p: playlistType) => {
        return <Playlist key={p.id} id={p.id} title={p.title} countTracks={p.count} music={p.music} />
    })
    const count = playlists.length
    return (
        <div className={classes.playlists}>
            <input className={classes.search} title="Search your playlists!" type="text" placeholder="Enter the playlist's title"/>
            <div className={classes.title}>
                <h2>You've got {count === 1 ? count + ' playlist' : count + ' playlists'}</h2>
            </div>
            <div className={classes.playlists}>
                <ul className={classes.list}>
                    {Playlists}
                </ul>
            </div>
        </div>
    )
}

export default Playlists