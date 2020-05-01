import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { setUserProfile } from '../../../BLL/reducer-profile';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
            this.props.setUserProfile(response.data);
        });
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainerWithUrl);