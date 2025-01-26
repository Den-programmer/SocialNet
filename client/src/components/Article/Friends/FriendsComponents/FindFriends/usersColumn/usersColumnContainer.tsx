import React from 'react'
import UsersColumn from './usersColumn'
import Preloader from '../../../../../common/preloader/preloader'
import { connect } from "react-redux"
import { requestUsers, followThunk, unfollowThunk, actions } from "../../../../../../BLL/reducer-friends"
import { getUsersInf, getUsers, getFollowingInProcess, getUsersFilter } from '../../../../../../BLL/selectors/users-selectors'
import { RootState } from '../../../../../../BLL/redux'
import { userType, FriendsFilter, UsersInfType } from '../../../../../../types/FriendsType/friendsType'
import { startDialog } from '../../../../../../BLL/reducer-messages'
import { getAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'
import { createNotification } from '../../../../../../BLL/reducer-notifications'

interface IUserColumnAPI {
    usersInf: UsersInfType
    userId: string
    followingInProcess: Array<string>
    users: Array<userType>
    filter: FriendsFilter
    followThunk: (userId: string) => void
    unfollowThunk: (userId: string) => void
    requestUsers: (pageSize: number, currentPage: number, term: string) => void
    startDialog: (userId: string) => void
    createNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    addToBlacklist: (itemId: string) => void
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
                {this.props.usersInf.isFetching ? <Preloader /> : <UsersColumn userId={this.props.userId} addToBlacklist={this.props.addToBlacklist} createNotification={this.props.createNotification} startDialog={this.props.startDialog} followThunk={this.props.followThunk} unfollowThunk={this.props.unfollowThunk}
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

const UsersColumnContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
    followThunk,
    unfollowThunk,
    startDialog,
    createNotification, 
    addToBlacklist
})(UsersColumnAPI)

export default UsersColumnContainer