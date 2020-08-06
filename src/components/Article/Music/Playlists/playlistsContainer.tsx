import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import Playlists from './playlists'
import { getPlaylists } from '../../../../BLL/selectors/music-selectors'

const mapStateToProps = (state: RootState) => ({
    playlists: getPlaylists(state)
})

const PlaylistsContainer = connect(mapStateToProps, {})(Playlists)

export default PlaylistsContainer