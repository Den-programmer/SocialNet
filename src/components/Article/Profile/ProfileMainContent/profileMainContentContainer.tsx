import { connect } from 'react-redux'
import ProfileMainContent from './profileMainContent'
import { RootState } from '../../../../BLL/redux'
import { getIsUserFollowedStatus, getPosts, getUserBackground, getUsersProfile } from '../../../../BLL/selectors/profile-selectors'
import { getFriends } from '../../../../BLL/selectors/users-selectors'
import { followThunk, unfollowThunk } from '../../../../BLL/reducer-friends'
import { updateStatusThunk,  getIsUserFollowed } from '../../../../BLL/reducer-profile'

const mapStateToProps = (state: RootState) => ({
    followed: getIsUserFollowedStatus(state),
    posts: getPosts(state),
    friends: getFriends(state),
    background: getUserBackground(state),
    profile: getUsersProfile(state)
}) 

const ProfileMainContentContainer = connect(mapStateToProps, { updateStatusThunk, followThunk, unfollowThunk, getIsUserFollowed })(ProfileMainContent)

export default ProfileMainContentContainer