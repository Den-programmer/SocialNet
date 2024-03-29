import FriendsByButton from './friendsByButton'
import { connect } from 'react-redux'
import { followThunk, unfollowThunk } from '../../../../../BLL/reducer-friends'
import { withAuthRedirect } from '../../../../../HOC/withAuthRedirect'
import { compose } from 'redux'
import { getFriends } from '../../../../../BLL/selectors/users-selectors'
import { RootState } from '../../../../../BLL/redux'

const mapStateToProps = (state: RootState) => ({
    friends: getFriends(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { followThunk, unfollowThunk }),
    withAuthRedirect
)(FriendsByButton)