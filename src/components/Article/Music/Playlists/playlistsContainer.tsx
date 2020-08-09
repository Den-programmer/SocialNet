import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import Playlists from './playlists'
import { getPlaylists } from '../../../../BLL/selectors/music-selectors'
import { actions } from '../../../../BLL/reducer-music'
import { actions as actions2 } from '../../../../BLL/reducer-app'
import { getIsModalOpenStatus } from '../../../../BLL/selectors/selectors'

const mapStateToProps = (state: RootState) => ({
    playlists: getPlaylists(state),
    isModalOpen: getIsModalOpenStatus(state)
})

const { addPlaylist } = actions
const { setIsModalOpenStatus } = actions2

const PlaylistsContainer = connect(mapStateToProps, { addPlaylist, setIsModalOpenStatus })(Playlists)

export default PlaylistsContainer