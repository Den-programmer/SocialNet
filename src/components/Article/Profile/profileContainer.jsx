import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import { setUserProfileThunk, setStatusThunk, updateStatusThunk } from '../../../BLL/reducer-profile';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { getUsersProfile, getPosts, getFriends, getAuthorizedUserId } from '../../../BLL/selectors/selectors';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.setUserProfileThunk(userId);
        this.props.setStatusThunk(userId);
    }
    render() {
        return (
            <Profile profile={this.props.profile} posts={this.props.posts} 
                     friends={this.props.friends} updateStatus={this.props.updateStatusThunk}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getUsersProfile(state),
        posts: getPosts(state),
        friends: getFriends(state),
        authorizedUserId: getAuthorizedUserId(state),
    }
}
export default compose(
    connect(mapStateToProps, { setUserProfileThunk, setStatusThunk, updateStatusThunk }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);