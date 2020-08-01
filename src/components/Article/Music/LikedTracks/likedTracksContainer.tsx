import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getLikedTracks, getTrackNotifications } from '../../../../BLL/selectors/music-selectors'
import MainMusicPage from '../MainMusicPage/mainMusicPage'
import { actions } from '../../../../BLL/reducer-music'
import { IMainMusicPageProps } from '../MainMusicPage/mainMusicPage'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { compose } from 'redux'

interface IProps extends IMainMusicPageProps {
    setLikedTracks: () => void
}

class LikedTracksClass extends React.Component<IProps> {
    componentDidMount() {
        this.props.setLikedTracks()
    }
    render() {
        return <MainMusicPage unsetIsMusicPlaying={this.props.unsetIsMusicPlaying} tracks={this.props.tracks} trackNotifications={this.props.trackNotifications} likeTrack={this.props.likeTrack}
        chooseTrack={this.props.chooseTrack} setTrackCurrentTime={this.props.setTrackCurrentTime}/>
    }
}

const mapStateToProps = (state:RootState) => ({
    tracks: getLikedTracks(state),
    trackNotifications: getTrackNotifications(state)
})

const { likeTrack, chooseTrack, setTrackCurrentTime, setLikedTracks, unsetIsMusicPlaying } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, { likeTrack, chooseTrack, setTrackCurrentTime, setLikedTracks, unsetIsMusicPlaying }),
    withAuthRedirect
)(LikedTracksClass)