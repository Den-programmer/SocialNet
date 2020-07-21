import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import Albums from './albums'

const mapStateToProps = (state: RootState) => ({})

const AlbumsContainer = connect(mapStateToProps, {})(Albums)

export default AlbumsContainer