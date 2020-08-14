import { connect } from 'react-redux'
import MainMusicPage from './mainMusicPage'
import { RootState } from '../../../../BLL/redux'
import { getTracks } from '../../../../BLL/selectors/music-selectors'
import { actions } from '../../../../BLL/reducer-music'
import { compose } from 'redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'

let mapStateToProps = (state: RootState) => ({
    tracks: getTracks(state)
})

const { setTrackCurrentTime, unsetIsMusicPlaying } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, { setTrackCurrentTime, unsetIsMusicPlaying }),
    withAuthRedirect
)(MainMusicPage)