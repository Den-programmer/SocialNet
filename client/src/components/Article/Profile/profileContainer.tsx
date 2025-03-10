import React from 'react'
import Profile from './profile'
import { connect } from 'react-redux'
import { setUserProfileThunk, setStatusThunk, updateStatusThunk, getIsUserFollowed, requestGender, requestUsername, requireUsersPosts } from '../../../BLL/reducer-profile'
import { followThunk, unfollowThunk } from '../../../BLL/reducer-friends'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { compose } from 'redux'
import { getFriends } from '../../../BLL/selectors/users-selectors'
import { getAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'
import { getUsersProfile, getPosts, getIsUserFollowedStatus, getUserBackground, getGender, getUsersName } from '../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../BLL/redux'
import { userType } from '../../../types/FriendsType/friendsType'
import { postType, profileType } from '../../../types/ProfileTypes/profileTypes'

interface IProfileContainer {
    authorizedUserId: string
    followed: boolean
    username: string
    requireUsersPosts: (userId: string) => void
    requestUsername: (userId: string) => void
    setStatusThunk: (userId: string) => void
    setUserProfileThunk: (userId: string) => void
    updateStatusThunk: (status: string) => void
    getIsUserFollowed: (userId: string) => void
    followThunk: (userId: string) => void
    unfollowThunk: (userId: string) => void
    requestGender: (userId: string) => void
    friends: Array<userType>
    profile: profileType
    posts: Array<postType>
    background: string
    gender: string
}

interface IRouteParams {
    userId: string
}

class ProfileContainer extends React.Component<IProfileContainer & RouteComponentProps<IRouteParams>> {
    refreshProfile() {
        let userId = this.props.match.params.userId// - if another user's page!
        if (!userId) {
            userId = this.props.authorizedUserId // - if current user's page!
            if (!userId) {
                this.props.history.push("/login") // - user is not authorized!
            }
        }
        this.props.setUserProfileThunk(userId)
        this.props.setStatusThunk(userId)
    }
    componentDidMount() {
        this.refreshProfile()
        setTimeout(() => {
            this.props.requestGender(this.props.profile.userId)
            this.props.requestUsername(this.props.profile.userId)
        }, 1000)
    }
    componentDidUpdate(prevProps: IProfileContainer & RouteComponentProps<IRouteParams>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
            setTimeout(() => {
                this.props.requestGender(this.props.profile.userId)
                this.props.requestUsername(this.props.profile.userId)
            }, 1000)
        }
    }
    render() {
        return <Profile follow={this.props.followThunk}
            unfollow={this.props.unfollowThunk}
            followed={this.props.followed}
            getIsUserFollowed={this.props.getIsUserFollowed}
            profile={this.props.profile}
            authorizedUserId={this.props.authorizedUserId}
            gender={this.props.gender}
            username={this.props.username}
            posts={this.props.posts} friends={this.props.friends} updateStatus={this.props.updateStatusThunk}
            background={this.props.background} 
            requireUsersPosts={this.props.requireUsersPosts}/>
    }
}

const mapStateToProps = (state: RootState) => ({
    profile: getUsersProfile(state),
    posts: getPosts(state),
    friends: getFriends(state),
    authorizedUserId: getAuthorizedUserId(state),
    followed: getIsUserFollowedStatus(state),
    background: getUserBackground(state),
    gender: getGender(state),
    username: getUsersName(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { requireUsersPosts, setUserProfileThunk, requestUsername, setStatusThunk, updateStatusThunk, getIsUserFollowed, followThunk, unfollowThunk, requestGender }),
    withRouter
)(ProfileContainer)