import { UsersAPI } from '../DAL/usersApi'
import { userType } from '../types/FriendsType/friendsType'
import { RootState } from './redux'
import { ThunkAction } from 'redux-thunk'
import { resultCode } from '../DAL/api'

const FOLLOW = 'Friends/FOLLOW'
const UNFOLLOW = 'Friends/UNFOLLOW'
const SET_USERS = 'Friends/SET-USERS'
const CHANGE_PAGE = 'Friends/CHANGE-PAGE'
const SET_USERSINF = 'Friends/SET-USERSINF'
const IS_FETCHING = 'Friends/IS_FETCHING'
const SET_FRIENDS = 'SET_FRIENDS'
const TOGGLE_IS_FOLLOWING_PROCESS = 'Friends/TOGGLE_IS_FOLLOWING_PROCESS'

type FriendsType = {
    friends: Array<userType>
    friendsInf: null | object
    users: Array<userType>
    usersInf: {
        isFetching: boolean
        totalCount: number
        pageSize: number
        currentPage: number
    }
    followingInProcess: Array<number>
}

const Friends = {
    friends: [],
    friendsInf: {},
    users: [],
    usersInf: {
        isFetching: true,
        totalCount: 0,
        pageSize: 12,
        currentPage: 1
    },
    followingInProcess: []
} as FriendsType

const reducerFriends = (state = Friends, action: ActionTypes): FriendsType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.users.filter((user: userType) => user.followed === true)
            }
        case FOLLOW:
            let currentUserArray:Array<object> = state.users.filter(user => {
                if (user.id === action.userId) return true;
            });
            let currentUser:any = currentUserArray.find(item => item)
            let newFriend = {
                id: action.userId,
                name: currentUser.name,
                nickname: currentUser.nickname,
                avatar: currentUser.avatar,
                followed: true,
            }

            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) return { ...user, followed: true }
                    return user
                }),
                friends: [...state.friends, newFriend]
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) return { ...user, followed: false }
                    return user
                }),
                friends: state.friends.filter(friend => friend.id !== action.userId)
            }
        case TOGGLE_IS_FOLLOWING_PROCESS:
            return {
                ...state,
                followingInProcess: action.isFetching ? [...state.followingInProcess, action.userId]
                    : state.followingInProcess.filter(id => id !== action.userId)
            }
        case CHANGE_PAGE:
            return {
                ...state,
                usersInf: { ...state.usersInf, currentPage: action.currentPage }
            }
        case SET_USERSINF:
            return {
                ...state,
                usersInf: { ...state.usersInf, totalCount: action.data.totalCount }
            }
        case IS_FETCHING:
            return {
                ...state,
                usersInf: { ...state.usersInf, isFetching: action.isFetching }
            }
        default:
            return state
    }
}

// Action Creators!

type ActionTypes = followActionType | 
unfollowActionType | 
setUsersActionType | 
changePageActionType | 
setUsersInfActionType | 
isFetchingActionType | 
toggleFollowingInProcessActionType | 
setFriendsActionType 
 
type followActionType = {
    type: typeof FOLLOW
    userId: number
}

export const follow = (userId: number):followActionType => {
    return { type: FOLLOW, userId }
}

type unfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollow = (userId: number):unfollowActionType => {
    return { type: UNFOLLOW, userId }
}

type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<userType>
}

export const setUsers = (users: Array<userType>):setUsersActionType => {
    return { type: SET_USERS, users }
}

type changePageActionType = {
    type: typeof CHANGE_PAGE
    currentPage: number
}

export const changePage = (currentPage: number):changePageActionType => {
    return { type: CHANGE_PAGE, currentPage }
}

type setUsersInfData = {
    totalCount: number
}

type setUsersInfActionType = {
    type: typeof SET_USERSINF
    data: setUsersInfData
}

export const setUsersInf = (data:setUsersInfData):setUsersInfActionType => {
    return { type: SET_USERSINF, data }
}

type isFetchingActionType = {
    type: typeof IS_FETCHING
    isFetching: boolean
}

export const isFetching = (isFetching:boolean):isFetchingActionType => {
    return { type: IS_FETCHING, isFetching }
}

type toggleFollowingInProcessActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROCESS
    isFetching: boolean
    userId: number
}

export const toggleFollowingInProcess = (isFetching: boolean, userId: number):toggleFollowingInProcessActionType => {
    return { type: TOGGLE_IS_FOLLOWING_PROCESS, isFetching, userId }
}

type setFriendsActionType = {
    type: typeof SET_FRIENDS
    users: Array<userType>
}

const setFriends = (users:Array<userType>):setFriendsActionType => {
    return { type: SET_FRIENDS, users }
}

// Thunk Creators!

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

export const requestUsers = (pageSize: number, currentPage: number):ThunkType => async (dispatch) => {
    try {
        dispatch(isFetching(true))
        let data = await UsersAPI.requestUsers(pageSize, currentPage)
        dispatch(isFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersInf(data))
        dispatch(setFriends(data.items))
    } catch (error) {
        alert(`Something's gone wrong, error status: ${error.status}`)
    }
}
export const followThunk = (userId: number):ThunkType => async (dispatch) => {
    try {
        dispatch(toggleFollowingInProcess(true, userId))
        let data = await UsersAPI.follow(userId)
        if (data.resultCode === resultCode.Success) {
            dispatch(follow(userId))
        }
        dispatch(toggleFollowingInProcess(false, userId))
    } catch (error) {
        alert(`Something's gone wrong, error status: ${error.status}`)
    }
}
export const unfollowThunk = (userId: number):ThunkType => async (dispatch) => {
    try {
        dispatch(toggleFollowingInProcess(true, userId))
        let data = await UsersAPI.unfollow(userId)
        if (data.resultCode === resultCode.Success) {
            dispatch(unfollow(userId))
        }
        dispatch(toggleFollowingInProcess(false, userId))
    } catch (error) {
        alert(`Something's gone wrong, error status: ${error.status}`)
    }
}

export default reducerFriends