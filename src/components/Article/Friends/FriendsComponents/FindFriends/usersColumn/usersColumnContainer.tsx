import React from 'react'
import UsersColumn from './usersColumn'
import Preloader from '../../../../../common/preloader/preloader'
import { connect } from "react-redux"
import { requestUsers, followThunk, unfollowThunk, actions } from "../../../../../../BLL/reducer-friends"
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
    requestUsers = () => {
        return this.props.requestUsers(this.props.usersInf.pageSize, this.props.usersInf.currentPage)
    }
    componentDidMount() {
        this.requestUsers()
    }
    componentDidUpdate(prevProps: IUserColumnAPI) {
        if (prevProps.usersInf.currentPage !== this.props.usersInf.currentPage) this.requestUsers()
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

const mapStateToProps = (state: RootState) => ({
    users: getUsers(state),
    usersInf: getUsersInf(state),
    followingInProcess: getFollowingInProcess(state)
})

const { follow, unfollow } = actions

const UsersColumnContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
    followThunk,
    unfollowThunk
})(UsersColumnAPI)

export default UsersColumnContainer