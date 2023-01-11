import { connect } from 'react-redux'
import MusicPageNav from './musicPageNav'
import { RootState } from '../../../../BLL/redux'
import { getMusicPageNavLinks } from '../../../../BLL/selectors/music-selectors'
import { compose } from 'redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'

const mapStateToProps = (state: RootState) => ({
    navLinks: getMusicPageNavLinks(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(MusicPageNav)