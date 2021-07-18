import { connect } from 'react-redux'
import { RootState } from '../../../BLL/redux'
import { getCurrentTrack,  getTracks, } from '../../../BLL/selectors/music-selectors'
import Audio from './audio'
import { actions } from '../../../BLL/reducer-music'

const mapStateToProps = (state: RootState) => ({
    currentTrack: getCurrentTrack(state),
    lastTrackId: getTracks(state).length,
})

const {  likeTrack, setTrackCurrentTime, chooseTrack, unsetIsMusicPlaying } = actions

const AudioContain = connect(mapStateToProps, 
    { likeTrack, setTrackCurrentTime, chooseTrack, unsetIsMusicPlaying })(Audio)

export default AudioContain