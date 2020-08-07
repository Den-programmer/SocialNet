import React, { useState } from 'react'
import classes from './playlists.module.css'
import { playlistType } from '../../../../BLL/reducer-music'
import Playlist from './playlist/playlist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '../../../common/Modal/modal'

interface IPlaylists {
    playlists: Array<playlistType>
    isModalOpen: boolean
    addPlaylist: (title: string) => void
    setIsModalOpenStatus: (modalStatus: boolean) => void
}

const Playlists: React.FC<IPlaylists> = ({ playlists, addPlaylist, setIsModalOpenStatus, isModalOpen }) => {
    const Playlists = playlists.map((p: playlistType) => {
        return <Playlist key={p.id} id={p.id} title={p.title} countTracks={p.count} music={p.music} />
    })
    const count = playlists.length
    const [playlistTitleValue, setPlaylistTitleValue] = useState<string>('')

    const onPlaylistTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistTitleValue(e.currentTarget.value)
    }

    const callModal = () => {
        setIsModalOpenStatus(true)
    }

    const onModalSubmit = () => {
        addPlaylist(playlistTitleValue)
        setIsModalOpenStatus(false)
        setPlaylistTitleValue('')
    }
    const onModalCancel = () => {
        setIsModalOpenStatus(false)
        setPlaylistTitleValue('')
    }
    return (
        <div className={classes.playlists}>
            <div onClick={callModal} className={classes.btn_addPlaylist}>
                <FontAwesomeIcon className={classes.plusIcon} icon={faPlus}/>
                <p>Add Playlist</p>
            </div>    
                {isModalOpen && <Modal isOpen={isModalOpen} title="Creating a new playlist" onSubmit={onModalSubmit} onCancel={onModalCancel}>
                    <input onChange={onPlaylistTitleChange} 
                    className={classes.playlistTitle} 
                    value={playlistTitleValue} 
                    placeholder="Enter playlist's title"/>
                </Modal>}
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