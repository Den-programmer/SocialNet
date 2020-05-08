import React from 'react';
import UsersColumn from './usersColumn';
import Preloader from '../../../../../common/preloader/preloader';
import { connect } from "react-redux";
import { follow, unfollow, setUsers, setUsersInf, isFetching, toggleFollowingInProcess } from "../../../../../../BLL/reducer-friends";
import { UsersAPI } from '../../../../../../DAL/api'

class UsersColumnAPI extends React.Component {
    componentDidMount() {
        this.props.isFetching(true);
        UsersAPI.getUsers(this.props.usersInf.pageSize, this.props.usersInf.currentPage).then(data => {
            this.props.isFetching(false);
            this.props.setUsers(data.items);
            this.props.setUsersInf(data);
        });
    }
    render() {
        return (
            <>
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn toggleFollowingInProcess={this.props.toggleFollowingInProcess} followingInProcess={this.props.followingInProcess} followingDisableButton={this.props.followingDisableButton} 
                    setUsers={this.props.setUsers}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow} users={this.props.users} />}
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
    setUsersInf,
    isFetching,
    toggleFollowingInProcess
})(UsersColumnAPI); 

export default UsersColumnContainer;