import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import Following from './following'

const mapStateToProps = (state: RootState) => ({})

const FollowingContainer = connect(mapStateToProps, {})(Following)

export default FollowingContainer