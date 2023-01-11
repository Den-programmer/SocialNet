import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import Following from './following'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { compose } from 'redux'

const mapStateToProps = (state: RootState) => ({
    singers: state.musicPage.following
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Following)