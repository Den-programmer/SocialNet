import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getLikedTracks, getTrackNotifications } from '../../../../BLL/selectors/selectors'
import MainMusicPage from '../MainMusicPage/mainMusicPage'
import { likeTrack, chooseTrack } from '../../../../BLL/reducer-music'

const mapStateToProps = (state:RootState) => ({
    tracks: getLikedTracks(state),
    trackNotifications: getTrackNotifications(state)
})

const LikedTracksContainer = connect(mapStateToProps, { likeTrack, chooseTrack })(MainMusicPage)

export default LikedTracksContainer