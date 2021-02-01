import React from 'react'
import UsersColumn from './usersColumn'
import Preloader from '../../../../../common/preloader/preloader'
import { connect } from "react-redux"
import { requestUsers, followThunk, unfollowThunk, actions, FriendsFilter } from "../../../../../../BLL/reducer-friends"
import { getUsersInf, getUsers, getFollowingInProcess, getUsersFilter } from '../../../../../../BLL/selectors/users-selectors'
import { RootState } from '../../../../../../BLL/redux'
import { userType } from '../../../../../../types/FriendsType/friendsType'
import { startDialog } from '../../../../../../BLL/reducer-messages'
import { actions as actions2 } from '../../../../../../BLL/reducer-notifications'

interface IUserColumnAPI {
    usersInf: {
        isFetching: boolean
        totalCount: number
        pageSize: number
        currentPage: number
    }
    followingInProcess: Array<number>
    users: Array<userType>
    filter: FriendsFilter
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    requestUsers: (pageSize: number, currentPage: number, term: string) => void
    startDialog: (userId: number) => void
    addNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
}

class UsersColumnAPI extends React.Component<IUserColumnAPI> {
    requestUsers = () => {
        return this.props.requestUsers(this.props.usersInf.pageSize, this.props.usersInf.currentPage, this.props.filter.term)
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
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn addNotification={this.props.addNotification} startDialog={this.props.startDialog} followThunk={this.props.followThunk} unfollowThunk={this.props.unfollowThunk}
                followingInProcess={this.props.followingInProcess} users={this.props.users} />}
            </>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    users: getUsers(state),
    usersInf: getUsersInf(state),
    followingInProcess: getFollowingInProcess(state),
    filter: getUsersFilter(state)
})

const { follow, unfollow } = actions
const { addNotification } = actions2

const UsersColumnContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
    followThunk,
    unfollowThunk,
    startDialog,
    addNotification
})(UsersColumnAPI)

export default UsersColumnContainer