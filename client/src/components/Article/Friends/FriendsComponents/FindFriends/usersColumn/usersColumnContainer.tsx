import React from 'react'
import UsersColumn from './usersColumn'
import Preloader from '../../../../../common/preloader/preloader'
import { connect } from "react-redux"
import { requestUsers, followThunk, unfollowThunk, actions } from "../../../../../../BLL/reducer-friends"
import { getUsersInf, getUsers, getFollowingInProcess, getUsersFilter } from '../../../../../../BLL/selectors/users-selectors'
import { RootState } from '../../../../../../BLL/redux'
import { userType, FriendsFilter } from '../../../../../../types/FriendsType/friendsType'
import { startDialog } from '../../../../../../BLL/reducer-messages'
import { actions as actions2 } from '../../../../../../BLL/reducer-notifications'
import { getAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'

interface IUserColumnAPI {
    usersInf: {
        isFetching: boolean
        totalCount: number
        pageSize: number
        currentPage: number
    }
    userId: any
    followingInProcess: Array<number>
    users: Array<userType>
    filter: FriendsFilter
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    requestUsers: (pageSize: number, currentPage: number, term: string) => void
    startDialog: (userId: number) => void
    addNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    addToBlacklist: (itemId: number) => void
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
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn userId={this.props.userId} addToBlacklist={this.props.addToBlacklist} addNotification={this.props.addNotification} startDialog={this.props.startDialog} followThunk={this.props.followThunk} unfollowThunk={this.props.unfollowThunk}
                followingInProcess={this.props.followingInProcess} users={this.props.users} />}
            </>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    users: getUsers(state),
    usersInf: getUsersInf(state),
    followingInProcess: getFollowingInProcess(state),
    filter: getUsersFilter(state),
    userId: getAuthorizedUserId(state)
})

const { follow, unfollow, addToBlacklist } = actions
const { addNotification } = actions2

const UsersColumnContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
    followThunk,
    unfollowThunk,
    startDialog,
    addNotification, 
    addToBlacklist
})(UsersColumnAPI)

export default UsersColumnContainer