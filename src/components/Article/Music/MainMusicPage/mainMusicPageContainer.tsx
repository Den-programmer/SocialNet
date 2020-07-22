import { connect } from 'react-redux'
import MainMusicPage from './mainMusicPage'
import { RootState } from '../../../../BLL/redux'
import { getTracks, getTrackNotifications } from '../../../../BLL/selectors/music-selectors'
import { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying } from '../../../../BLL/reducer-music'

let mapStateToProps = (state: RootState) => ({
    tracks: getTracks(state),
    trackNotifications: getTrackNotifications(state)
})

const MainMusicPageContainer = connect(mapStateToProps, { likeTrack, chooseTrack, setTrackCurrentTime, unsetIsMusicPlaying })(MainMusicPage)

export default MainMusicPageContainer