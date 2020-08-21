import { connect } from 'react-redux'
import Track from './track'
import { RootState } from '../../../../../BLL/redux'
import { getTrackNotifications, getPlaylists } from '../../../../../BLL/selectors/music-selectors'
import { getIsModalOpenStatus } from '../../../../../BLL/selectors/selectors'
import { actions } from '../../../../../BLL/reducer-music'
import { actions as actions_2 } from '../../../../../BLL/reducer-app'

const mapStateToProps = (state: RootState) => ({
    trackNotifications: getTrackNotifications(state),
    isModalOpen: getIsModalOpenStatus(state),
    playlists: getPlaylists(state)
})

const { likeTrack, chooseTrack, ignoreTrack, addTrackToPlaylist, setCurrentTrack } = actions
const { setIsModalOpenStatus } = actions_2

const TrackContainer = connect(mapStateToProps, { likeTrack, chooseTrack, ignoreTrack, addTrackToPlaylist, setIsModalOpenStatus, setCurrentTrack })(Track)

export default TrackContainer