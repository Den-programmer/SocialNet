import { connect } from 'react-redux'
import ProfileMainContent from './profileMainContent'
import { RootState } from '../../../../BLL/redux'
import { getIsUserFollowedStatus, getPosts, getUserBackground, getUsersProfile, getGender, getUsersName } from '../../../../BLL/selectors/profile-selectors'
import { getFriends } from '../../../../BLL/selectors/users-selectors'
import { followThunk, unfollowThunk } from '../../../../BLL/reducer-friends'
import { updateStatusThunk,  getIsUserFollowed } from '../../../../BLL/reducer-profile'
import { getAuthorizedUserId } from '../../../../BLL/selectors/auth-selectors'

const mapStateToProps = (state: RootState) => ({
    followed: getIsUserFollowedStatus(state),
    posts: getPosts(state),
    friends: getFriends(state),
    background: getUserBackground(state),
    profile: getUsersProfile(state),
    gender: getGender(state),
    username: getUsersName(state),
    authorizedUserId: getAuthorizedUserId(state)
}) 

const ProfileMainContentContainer = connect(mapStateToProps, 
    { updateStatusThunk, followThunk, unfollowThunk, getIsUserFollowed })(ProfileMainContent)

export default ProfileMainContentContainer