import React from 'react'
import classes from './albums.module.css'

interface IAlbums {}

const Albums: React.FC<IAlbums> = (props) => {
    return (
        <div className={classes.albums}>
            <h1>In developing...</h1>
        </div>
    )
}

export default Albums