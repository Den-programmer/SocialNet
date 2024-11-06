import FriendsByButton from './friendsByButton'
import { connect } from 'react-redux'
import { followThunk, requestFollowing, unfollowThunk } from '../../../../../BLL/reducer-friends'
import { withAuthRedirect } from '../../../../../HOC/withAuthRedirect'
import { compose } from 'redux'
import { getFriends, getUsersInf } from '../../../../../BLL/selectors/users-selectors'
import { RootState } from '../../../../../BLL/redux'
import { getFilterTerm } from '../../../../../BLL/selectors/music-selectors'

const mapStateToProps = (state: RootState) => ({
    friends: getFriends(state),
    usersInf: getUsersInf(state),
    filter: getFilterTerm(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { followThunk, unfollowThunk, requestFollowing }),
    withAuthRedirect
)(FriendsByButton)