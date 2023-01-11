import React from 'react'
import { IMenuStyleState } from '../playlist'

interface IPlaylistContextMenu { 
    playlistId: number
    styleMenu: IMenuStyleState
    deletePlaylist: (playlistId: number) => void
    setEditingStatus: any
}

const PlaylistContextMenu: React.FC<IPlaylistContextMenu> = ({ playlistId, styleMenu, deletePlaylist, setEditingStatus }) => {
    const editPlaylistTitle = () => {
        setEditingStatus(true)
    }
    return (
        <div style={styleMenu} className="contextMenu">
            <ul className="contextMenu__list">
                <li onClick={() => deletePlaylist(playlistId)} className="contextMenu__list-item">Delete playlist</li>
                <li onClick={editPlaylistTitle}className="contextMenu__list-item">Change playlist's title</li>
                <li className="contextMenu__list-item">Change playlist's photo</li>
            </ul>
        </div>
    )
}

export default PlaylistContextMenu