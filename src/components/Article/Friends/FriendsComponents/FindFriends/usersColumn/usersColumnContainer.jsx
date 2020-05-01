import React from 'react';
import * as axios from 'axios';
import UsersColumn from './usersColumn';
import Preloader from '../../../../../common/preloader/preloader';
import { connect } from "react-redux";
import { follow, unfollow, setUsers, setUsersInf, isFetching } from "../../../../../../BLL/reducer-friends";

class UsersColumnAPI extends React.Component {
    componentDidMount() {
        this.props.isFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersInf.pageSize}&page=${this.props.usersInf.currentPage}`).then(response => {
            this.props.isFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setUsersInf(response.data);
        });
    }
    render() {
        return (
            <>
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn setUsers={this.props.setUsers}
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
    }
}

const UsersColumnContainer = connect(mapStateToProps, {
    follow: follow,
    unfollow: unfollow,
    setUsers: setUsers,
    setUsersInf: setUsersInf,
    isFetching:isFetching
})(UsersColumnAPI); 

export default UsersColumnContainer;