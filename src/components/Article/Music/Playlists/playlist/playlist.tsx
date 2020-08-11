import React, { useState } from 'react'
import classes from './playlist.module.css'
import { trackType } from '../../../../../BLL/reducer-music'
import playlistWithoutUserImg from './img/playlist_default.jpg'
import PlaylistContextMenu from './playlistContextMenu/playlistContextMenu'

interface IPlaylist {
    id: number
    title: string
    countTracks: number
    music: Array<trackType>
    deletePlaylist: (playlistId: number) => void
}

export interface IMenuStyleState {
    top: string
    left: string
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

    const [isMenuOpen, setIsMenuOpenStatus] = useState<boolean>(false)
    const [menuStyle, setMenuStyle] = useState<IMenuStyleState>({ top: 0 + 'px', left: 0 + 'px' })

    const callContextMenu = (e: React.MouseEvent<HTMLLIElement>) => {
        setIsMenuOpenStatus(true)
        const realHigh = e.clientY
        const realWidth = e.clientX
        setMenuStyle({ top: realHigh + 'px', left: realWidth + 'px' })
        e.preventDefault()
    }
    document.addEventListener('click', event => {
        if(event.button !== 2) setIsMenuOpenStatus(false)
    })

    return (
        <React.Fragment>
            {props.music.length < 4 ? <li onContextMenu={callContextMenu} className={classes.playlist}>
                <div className={classes.playlistImg}>
                    <div className={classes.image}><img className={classes.playlistWithoutUserImg} src={playlistWithoutUserImg} alt=""/></div>
                </div>
                {isMenuOpen && <PlaylistContextMenu playlistId={props.id} styleMenu={menuStyle} deletePlaylist={props.deletePlaylist}/>}
                <div className={classes.playlistsInf}>
                    <h4>{props.title}</h4>
                    <p>{countTracks}</p>
                </div>
            </li> : <li onContextMenu={callContextMenu} className={classes.playlist}>
                <div className={classes.playlistImg}>
                    {images}
                </div>
                {isMenuOpen && <PlaylistContextMenu playlistId={props.id} styleMenu={menuStyle} deletePlaylist={props.deletePlaylist}/>}
                <div className={classes.playlistsInf}>
                    <h4>{props.title}</h4>
                    <p>{countTracks}</p>
                </div>
            </li>}
        </React.Fragment>
    )
}

export default Playlist