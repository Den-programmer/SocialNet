import React from 'react'
import UsersColumn from './usersColumn'
import Preloader from '../../../../../common/preloader/preloader'
import { connect } from "react-redux"
import { follow, unfollow, requestUsers, followThunk, unfollowThunk } from "../../../../../../BLL/reducer-friends"
import { getUsersInf, getUsers, getFollowingInProcess } from '../../../../../../BLL/selectors/users-selectors'
import { RootState } from '../../../../../../BLL/redux'
import { userType } from '../../../../../../types/FriendsType/friendsType'

interface IUserColumnAPI {
    usersInf: {
        isFetching: boolean
        totalCount: number
        pageSize: number
        currentPage: number
    }
    followingInProcess: Array<number>
    users: Array<userType>
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    requestUsers: (pageSize: number, currentPage: number) => void
}

class UsersColumnAPI extends React.Component<IUserColumnAPI> {
    componentDidMount() {
        this.props.requestUsers(this.props.usersInf.pageSize, this.props.usersInf.currentPage)
    }
    componentDidUpdate(prevProps: IUserColumnAPI) {
        if (prevProps.usersInf.currentPage !== this.props.usersInf.currentPage) {
            this.props.requestUsers(this.props.usersInf.pageSize, this.props.usersInf.currentPage)
        }
    }
    render() {
        return (
            <>
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn followThunk={this.props.followThunk} unfollowThunk={this.props.unfollowThunk}
                followingInProcess={this.props.followingInProcess} users={this.props.users} />}
            </>
        )
    }
}

let mapStateToProps = (state: RootState) => ({
    users: getUsers(state),
    usersInf: getUsersInf(state),
    followingInProcess: getFollowingInProcess(state)
})

const UsersColumnContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
    followThunk,
    unfollowThunk
})(UsersColumnAPI)

export default UsersColumnContainer