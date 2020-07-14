import React from 'react'
import UsersColumn from './usersColumn'
import Preloader from '../../../../../common/preloader/preloader'
import { connect } from "react-redux"
import { follow, unfollow, setUsers, requestUsers, followThunk, unfollowThunk } from "../../../../../../BLL/reducer-friends"
import { getUsersInf, getUsers, getFollowingInProcess } from '../../../../../../BLL/selectors/users-selectors'

class UsersColumnAPI extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.usersInf.pageSize, this.props.usersInf.currentPage)
    }
    render() {
        return (
            <>
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn followThunk={this.props.followThunk} unfollowThunk={this.props.unfollowThunk}
                followingInProcess={this.props.followingInProcess} 
                setUsers={this.props.setUsers} users={this.props.users} />}
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        usersInf: getUsersInf(state),
        followingInProcess: getFollowingInProcess(state)
    }
}

const UsersColumnContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    requestUsers,
    followThunk,
    unfollowThunk
})(UsersColumnAPI)

export default UsersColumnContainer