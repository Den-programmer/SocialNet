import React from 'react';
import * as axios from 'axios';
import UsersColumn from './usersColumn';
import Preloader from '../../../../../common/preloader/preloader';


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

export default UsersColumnAPI;