import { UsersAPI } from '../DAL/usersApi'
import { userType } from '../types/FriendsType/friendsType'
import { RootState, InferActionTypes } from './redux'
import { ThunkAction } from 'redux-thunk'
import { resultCode } from '../DAL/api'

const Friends = {
    friends: [] as Array<userType>,
    friendsInf: {},
    users: [] as Array<userType>,
    usersInf: {
        isFetching: true,
        totalCount: 0,
        pageSize: 12,
        currentPage: 1
    },
    followingInProcess: [] as Array<number>,
    filter: {
        term: ''
    },
    blacklist: [

    ] as Array<userType>
}

const reducerFriends = (state = Friends, action: ActionTypes): typeof Friends => {
    switch (action.type) {
        case `sn/Friends/SET-USERS`:
            return {
                ...state,
                users: action.users
            }
        case `sn/Friends/SET_FRIENDS`:
            return {
                ...state,
                friends: action.users.filter((user: userType) => user.followed === true)
            }
        case `sn/Friends/FOLLOW`:
            let currentUserArray: Array<object> = state.users.filter(user => {
                if (user.id === action.userId) return true;
            })
            let currentUser: any = currentUserArray.find(item => item)
            let newFriend = {
                id: action.userId,
                name: currentUser.name,
                status: null,
                nickname: currentUser.nickname,
                photos: {
                    large: currentUser.avatar,
                    small: currentUser.avatar
                },
                followed: true
            }
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) return { ...user, followed: true }
                    return user
                }),
                friends: [...state.friends, newFriend]
            }
        case `sn/Friends/UNFOLLOW`:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) return { ...user, followed: false }
                    return user
                }),
                friends: state.friends.filter(friend => friend.id !== action.userId)
            }
        case `sn/Friends/TOGGLE_IS_FOLLOWING_PROCESS`:
            return {
                ...state,
                followingInProcess: action.isFetching ? [...state.followingInProcess, action.userId]
                    : state.followingInProcess.filter(id => id !== action.userId)
            }
        case `sn/Friends/CHANGE-PAGE`:
            return {
                ...state,
                usersInf: { ...state.usersInf, currentPage: action.currentPage }
            }
        case `sn/Friends/SET-USERSINF`:
            return {
                ...state,
                usersInf: { ...state.usersInf, totalCount: action.data.totalCount }
            }
        case `sn/Friends/IS_FETCHING`:
            return {
                ...state,
                usersInf: { ...state.usersInf, isFetching: action.isFetching }
            }

        case `sn/Friends/ADD_TO_BLACKLIST`:
            const currentBlacked = state.users.filter(item => item.id === action.itemId && true).find(item => item && item)
            const currentBlackedUser = {
                id: action.itemId,
                name: currentBlacked?.name !== undefined ? currentBlacked?.name : '',
                status: null,
                nickname: currentBlacked?.nickname !== undefined ? currentBlacked?.nickname : '',
                photos: {
                    large: currentBlacked?.photos.large !== undefined ? currentBlacked?.photos.large : '',
                    small: currentBlacked?.photos.small !== undefined ? currentBlacked?.photos.small : ''
                },
                followed: false
            }
            return {
                ...state,
                blacklist: [...state.blacklist, currentBlackedUser]
            }
        case `sn/Friends/DELETE_FROM_BLACKLIST`:
            return {
                ...state,
                blacklist: state.blacklist.filter(item => item.id !== action.itemId && true) 
            }    
        default:
            return state
        case `sn/Friends/SET_USERS_TERM`:
            return {
                ...state,
                filter: { ...state.filter, term: action.term }
            }
    }
}

// Action Creators!

type ActionTypes = InferActionTypes<typeof actions>

type setUsersInfData = {
    totalCount: number
}

export const actions = {
    follow: (userId: number) => ({ type: `sn/Friends/FOLLOW`, userId } as const),
    unfollow: (userId: number) => ({ type: `sn/Friends/UNFOLLOW`, userId } as const),
    setUsers: (users: Array<userType>) => ({ type: `sn/Friends/SET-USERS`, users } as const),
    changePage: (currentPage: number) => ({ type: `sn/Friends/CHANGE-PAGE`, currentPage } as const),
    setUsersInf: (data: setUsersInfData) => ({ type: `sn/Friends/SET-USERSINF`, data } as const),
    isFetching: (isFetching: boolean) => ({ type: `sn/Friends/IS_FETCHING`, isFetching } as const),
    toggleFollowingInProcess: (isFetching: boolean, userId: number) => ({ type: `sn/Friends/TOGGLE_IS_FOLLOWING_PROCESS`, isFetching, userId } as const),
    setFriends: (users: Array<userType>) => ({ type: `sn/Friends/SET_FRIENDS`, users } as const),
    setUsersTerm: (term: string) => ({ type: `sn/Friends/SET_USERS_TERM`, term } as const),
    addToBlacklist: (itemId: number) => ({ type: `sn/Friends/ADD_TO_BLACKLIST`, itemId } as const),
    deleteFromBlacklist: (itemId: number) => ({ type: `sn/Friends/DELETE_FROM_BLACKLIST`, itemId } as const)
}

// Thunk Creators!

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionTypes>

export const requestUsers = (pageSize: number, currentPage: number, term: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.isFetching(true))
        let data = await UsersAPI.requestUsers(pageSize, currentPage, term)
        dispatch(actions.isFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setUsersInf(data))
        dispatch(actions.setFriends(data.items))
        dispatch(actions.setUsersTerm(term))
        return data
    } catch (error) {
        alert(`Something's gone wrong, error status: ${error.status}`)
    }
}
export const followThunk = (userId: number): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleFollowingInProcess(true, userId))
        let data = await UsersAPI.follow(userId)
        if (data.resultCode === resultCode.Success) {
            dispatch(actions.follow(userId))
        }
        dispatch(actions.toggleFollowingInProcess(false, userId))
    } catch (error) {
        alert(`Something's gone wrong, error status: ${error.status}`)
    }
}
export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleFollowingInProcess(true, userId))
        let data = await UsersAPI.unfollow(userId)
        if (data.resultCode === resultCode.Success) {
            dispatch(actions.unfollow(userId))
        }
        dispatch(actions.toggleFollowingInProcess(false, userId))
    } catch (error) {
        alert(`Something's gone wrong, error status: ${error.status}`)
    }
}

export default reducerFriends