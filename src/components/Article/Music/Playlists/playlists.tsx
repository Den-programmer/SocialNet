import React from 'react'
import classes from './playlists.module.css'
import { playlistType } from '../../../../BLL/reducer-music'
import Playlist from './playlist/playlist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
            <div className={classes.btn_addPlaylist}>
                <FontAwesomeIcon className={classes.plusIcon} icon={faPlus}/>
                <p>Add Playlist</p>
            </div>
            <div className={classes.search}>
                <input title="Search your playlists!" type="text" placeholder="Enter the playlist's title"/>
            </div>
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