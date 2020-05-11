import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import { setUserProfileThunk } from '../../../BLL/reducer-profile';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.setUserProfileThunk(userId);
    }
    render() {
        return (
            <Profile profile={this.props.profile} posts={this.props.posts} friends={this.props.friends}/>
        );
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        posts: state.profilePage.posts,
        friends: state.Friends.friends
    }
}

let ProfileContainerWithUrl = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { setUserProfileThunk })(ProfileContainerWithUrl);