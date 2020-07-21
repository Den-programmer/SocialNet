import React from 'react'
import classes from './playlists.module.css'

interface IPlaylists {}

const Playlists: React.FC<IPlaylists> = (props) => {
    return (
        <div className={classes.playlists}>
            <h1>In developing...</h1>
        </div>
    )
}

export default Playlists