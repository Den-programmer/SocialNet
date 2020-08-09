import { connect } from 'react-redux'
import MainMusicPage from './mainMusicPage'
import { RootState } from '../../../../BLL/redux'
import { getTracks, getTrackNotifications, getPlaylists } from '../../../../BLL/selectors/music-selectors'
import { actions } from '../../../../BLL/reducer-music'
import { actions as actions2 } from '../../../../BLL/reducer-app'
import { compose } from 'redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { getIsModalOpenStatus } from '../../../../BLL/selectors/selectors'

let mapStateToProps = (state: RootState) => ({
    tracks: getTracks(state),
    playlists: getPlaylists(state),
    trackNotifications: getTrackNotifications(state),
    isModalOpen: getIsModalOpenStatus(state)
})

const { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying, addTrackToPlaylist } = actions
const { setIsModalOpenStatus } = actions2

export default compose<React.ComponentType>(
    connect(mapStateToProps, { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying, addTrackToPlaylist, setIsModalOpenStatus }),
    withAuthRedirect
)(MainMusicPage)