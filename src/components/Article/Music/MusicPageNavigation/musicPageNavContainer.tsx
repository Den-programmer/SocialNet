import { connect } from 'react-redux'
import MusicPageNav from './musicPageNav'
import { RootState } from '../../../../BLL/redux'
import { getMusicPageNavLinks } from '../../../../BLL/selectors/selectors'

let mapStateToProps = (state: RootState) => ({
    navLinks: getMusicPageNavLinks(state)
})

const MusicPageNavContainer = connect(mapStateToProps, {})(MusicPageNav);

export default MusicPageNavContainer;