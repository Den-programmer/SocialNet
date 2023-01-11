import { connect } from 'react-redux'
import { RootState } from '../../../../../BLL/redux'
import TracksSearching from './tracksSearching'
import { actions } from '../../../../../BLL/reducer-music'

const mapStateToProps = (state: RootState) => ({

})

const { setFilterTerm } = actions

const TracksSearchingContainer = connect(mapStateToProps, { setFilterTerm })(TracksSearching)

export default TracksSearchingContainer