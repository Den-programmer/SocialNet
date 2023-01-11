import React, { Component } from 'react'
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
    deletePlaylist: (playlistId: number) => void
    changePlaylistTitle: (title: string, playlistId: number) => void
    setIsModalOpenStatus: (modalStatus: boolean) => void
}

class Playlists extends Component<IPlaylists> {
    Playlists = this.props.playlists.map((p: playlistType) => {
        return <Playlist key={p.id} id={p.id}
            title={p.title}
            countTracks={p.count}
            music={p.music}
            deletePlaylist={this.props.deletePlaylist}
            changePlaylistTitle={this.props.changePlaylistTitle} />
    })
    count = this.props.playlists.length
    state = {
        playlistTitleValue: ''
    }

    onPlaylistTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            playlistTitleValue: e.currentTarget.value
        })
    }

    callModal = () => this.props.setIsModalOpenStatus(true)

    onModalSubmit = () => {
        this.props.addPlaylist(this.state.playlistTitleValue)
        this.props.setIsModalOpenStatus(false)
        this.setState({ playlistTitleValue: '' })
    }
    onModalCancel = () => {
        this.props.setIsModalOpenStatus(false)
        this.setState({ playlistTitleValue: '' })
    }
    componentWillUnmount() {
        this.props.setIsModalOpenStatus(false)
    }
    render() {
        return (
            <div className={classes.playlists}>
                <div onClick={this.callModal} className={classes.btn_addPlaylist}>
                    <FontAwesomeIcon className={classes.plusIcon} icon={faPlus} />
                    <p>Add Playlist</p>
                </div>
                {this.props.isModalOpen && <Modal isOpen={this.props.isModalOpen} title="Creating a new playlist" onSubmit={this.onModalSubmit} onCancel={this.onModalCancel}>
                    <input onChange={this.onPlaylistTitleChange}
                        className={classes.playlistTitle}
                        value={this.state.playlistTitleValue}
                        placeholder="Enter playlist's title" />
                </Modal>}
                <div className={classes.search}>
                    <input title="Search your playlists!" type="text" placeholder="Enter the playlist's title" />
                </div>
                <div className={classes.title}>
                    <h2>You've got {this.count === 1 ? this.count + ' playlist' : this.count + ' playlists'}</h2>
                </div>
                <div className={classes.playlists}>
                    <ul className={classes.list}>
                        {this.Playlists}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Playlists