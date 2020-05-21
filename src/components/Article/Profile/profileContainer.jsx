import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import { setUserProfileThunk, setStatusThunk, updateStatusThunk } from '../../../BLL/reducer-profile';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 7149;
        }
        this.props.setUserProfileThunk(userId);
        this.props.setStatusThunk(userId);
    }
    render() {
        return (
            <Profile  profile={this.props.profile} posts={this.props.posts} 
                     friends={this.props.friends} updateStatus={this.props.updateStatusThunk}/>
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
export default compose(
    connect(mapStateToProps, { setUserProfileThunk, setStatusThunk, updateStatusThunk }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);