import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import { setUserProfileThunk } from '../../../BLL/reducer-profile';
import { withRouter } from 'react-router-dom';

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

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        posts: state.profilePage.posts,
        friends: state.Friends.friends
    }
}

let ProfileContainerWithUrl = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfileThunk })(ProfileContainerWithUrl);