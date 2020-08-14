import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getLikedTracks, getTrackNotifications, getPlaylists } from '../../../../BLL/selectors/music-selectors'
import MainMusicPage from '../MainMusicPage/mainMusicPage'
import { actions } from '../../../../BLL/reducer-music'
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
        return <MainMusicPage unsetIsMusicPlaying={this.props.unsetIsMusicPlaying} 
        tracks={this.props.tracks} setTrackCurrentTime={this.props.setTrackCurrentTime}/>
    }
}

const mapStateToProps = (state:RootState) => ({
    tracks: getLikedTracks(state),
    trackNotifications: getTrackNotifications(state),
    isModalOpen: getIsModalOpenStatus(state),
    playlists: getPlaylists(state)
})

const { setTrackCurrentTime, setLikedTracks, unsetIsMusicPlaying } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setTrackCurrentTime, 
        setLikedTracks, 
        unsetIsMusicPlaying}),
    withAuthRedirect
)(LikedTracksClass)