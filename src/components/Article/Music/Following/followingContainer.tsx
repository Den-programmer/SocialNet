import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import Following from './following'

const mapStateToProps = (state: RootState) => ({
    singers: state.musicPage.following
})

const FollowingContainer = connect(mapStateToProps, {})(Following)

export default FollowingContainer