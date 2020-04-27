import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { setUserProfile, isProfileFetching } from '../../../BLL/reducer-profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.isProfileFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setUserProfile(response.data);
            this.props.isProfileFetching(false);
        });
    }
    render() {
        return (
            <Profile profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, { setUserProfile, isProfileFetching })(ProfileContainer);