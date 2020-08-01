import { connect } from 'react-redux'
import MainMusicPage from './mainMusicPage'
import { RootState } from '../../../../BLL/redux'
import { getTracks, getTrackNotifications } from '../../../../BLL/selectors/music-selectors'
import { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying } from '../../../../BLL/reducer-music'
import { compose } from 'redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'

let mapStateToProps = (state: RootState) => ({
    tracks: getTracks(state),
    trackNotifications: getTrackNotifications(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying }),
    withAuthRedirect
)(MainMusicPage)