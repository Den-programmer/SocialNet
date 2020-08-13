import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getLikedTracks, getTrackNotifications, getPlaylists } from '../../../../BLL/selectors/music-selectors'
import MainMusicPage from '../MainMusicPage/mainMusicPage'
import { actions } from '../../../../BLL/reducer-music'
import { actions as actions2 } from '../../../../BLL/reducer-app'
import { IMainMusicPageProps } from '../MainMusicPage/mainMusicPage'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { compose } from 'redux'
import { getIsModalOpenStatus } from '../../../../BLL/selectors/selectors'

interface IProps extends IMainMusicPageProps {
    setLikedTracks: () => void
}

class LikedTracksClass extends React.Component<IProps> {
    componentDidMount() {
        this.props.setLikedTracks()
    }
    render() {
        return <MainMusicPage ignoreTrack={this.props.ignoreTrack} isModalOpen={this.props.isModalOpen} setIsModalOpenStatus={this.props.setIsModalOpenStatus} playlists={this.props.playlists} addTrackToPlaylist={this.props.addTrackToPlaylist} unsetIsMusicPlaying={this.props.unsetIsMusicPlaying} tracks={this.props.tracks} trackNotifications={this.props.trackNotifications} likeTrack={this.props.likeTrack}
        chooseTrack={this.props.chooseTrack} setTrackCurrentTime={this.props.setTrackCurrentTime}/>
    }
}

const mapStateToProps = (state:RootState) => ({
    tracks: getLikedTracks(state),
    trackNotifications: getTrackNotifications(state),
    isModalOpen: getIsModalOpenStatus(state),
    playlists: getPlaylists(state)
})

const { likeTrack, chooseTrack, setTrackCurrentTime, setLikedTracks, unsetIsMusicPlaying, addTrackToPlaylist, ignoreTrack } = actions
const { setIsModalOpenStatus } = actions2

export default compose<React.ComponentType>(
    connect(mapStateToProps, { likeTrack, 
        chooseTrack, 
        setTrackCurrentTime, 
        setLikedTracks, 
        unsetIsMusicPlaying, 
        addTrackToPlaylist, 
        ignoreTrack,
        setIsModalOpenStatus }),
    withAuthRedirect
)(LikedTracksClass)