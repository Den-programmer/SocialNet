import React from 'react';
import UsersColumn from './usersColumn';
import Preloader from '../../../../../common/preloader/preloader';
import { connect } from "react-redux";
import { follow, unfollow, setUsers, getUsers, followThunk, unfollowThunk } from "../../../../../../BLL/reducer-friends";

class UsersColumnAPI extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.usersInf.pageSize, this.props.usersInf.currentPage);
    }
    render() {
        return (
            <>
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn followThunk={this.props.followThunk} unfollowThunk={this.props.unfollowThunk}
                followingInProcess={this.props.followingInProcess} 
                    followingDisableButton={this.props.followingDisableButton} 
                    setUsers={this.props.setUsers} users={this.props.users} />}
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.Friends.users,
        usersInf: state.Friends.usersInf,
        followingDisableButton: state.Friends.followingDisableButton,
        followingInProcess: state.Friends.followingInProcess,
    }
}

const UsersColumnContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    getUsers,
    followThunk,
    unfollowThunk
})(UsersColumnAPI); 

export default UsersColumnContainer;