import { connect } from 'react-redux'
import MainMusicPage from './mainMusicPage'
import { RootState } from '../../../../BLL/redux'
import { getTracks, getTrackNotifications } from '../../../../BLL/selectors/music-selectors'
import { actions } from '../../../../BLL/reducer-music'
import { compose } from 'redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'

let mapStateToProps = (state: RootState) => ({
    tracks: getTracks(state),
    trackNotifications: getTrackNotifications(state)
})

const { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying, addTrackToPlaylist } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying, addTrackToPlaylist }),
    withAuthRedirect
)(MainMusicPage)