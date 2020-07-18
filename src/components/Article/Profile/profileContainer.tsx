import React from 'react'
import Profile from './profile'
import { connect } from 'react-redux'
import { setUserProfileThunk, setStatusThunk, updateStatusThunk, profileType } from '../../../BLL/reducer-profile'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withAuthRedirect } from '../../../HOC/withAuthRedirect'
import { compose } from 'redux'
import { getFriends } from '../../../BLL/selectors/users-selectors'
import { getAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'
import { getUsersProfile, getPosts } from '../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../BLL/redux'
import { userType } from '../../../types/FriendsType/friendsType'
import { postType } from '../../../BLL/reducer-profile'

interface IProfileContainer {
    authorizedUserId: number
    setStatusThunk: (userId: number) => void
    setUserProfileThunk: (userId: number) => void
    updateStatusThunk: (status: string) => void
    friends: Array<userType>
    profile: profileType
    posts: Array<postType>
}
interface IRouteParams {
    userId: string 
}

class ProfileContainer extends React.Component<IProfileContainer & RouteComponentProps<IRouteParams>> {
    refreshProfile() {
        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.setUserProfileThunk(userId)
        this.props.setStatusThunk(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: IProfileContainer & RouteComponentProps<IRouteParams>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }
    render() {
        return <Profile profile={this.props.profile} 
                        posts={this.props.posts} friends={this.props.friends} updateStatus={this.props.updateStatusThunk} />
    }
}

const mapStateToProps = (state: RootState) => ({
    profile: getUsersProfile(state),
    posts: getPosts(state),
    friends: getFriends(state),
    authorizedUserId: getAuthorizedUserId(state)
})

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, { setUserProfileThunk, setStatusThunk, updateStatusThunk })
)(ProfileContainer)