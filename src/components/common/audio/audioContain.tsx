import { connect } from 'react-redux'
import { RootState } from '../../../BLL/redux'
import { getCurrentTrack,  getTracks, getVolume, } from '../../../BLL/selectors/music-selectors'
import Audio from './audio'
import { actions } from '../../../BLL/reducer-music'

const mapStateToProps = (state: RootState) => ({
    currentTrack: getCurrentTrack(state),
    lastTrackId: getTracks(state).length,
    volume: getVolume(state)
})

const {  likeTrack, chooseTrack, unsetIsMusicPlaying, setVolume } = actions

const AudioContain = connect(mapStateToProps, { likeTrack, chooseTrack, unsetIsMusicPlaying, setVolume })(Audio)

export default AudioContain