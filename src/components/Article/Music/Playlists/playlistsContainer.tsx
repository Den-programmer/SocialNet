import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import Playlists from './playlists'

const mapStateToProps = (state: RootState) => ({})

const PlaylistsContainer = connect(mapStateToProps, {})(Playlists)

export default PlaylistsContainer