import { UsersAPI } from '../DAL/api';

const FOLLOW = 'Friends/FOLLOW';
const UNFOLLOW = 'Friends/UNFOLLOW';
const SET_USERS = 'Friends/SET-USERS';
const CHANGE_PAGE = 'Friends/CHANGE-PAGE';
const SET_USERSINF = 'Friends/SET-USERSINF';
const IS_FETCHING = 'Friends/IS_FETCHING';
const SET_FRIENDS = 'SET_FRIENDS';
const TOGGLE_IS_FOLLOWING_PROCESS = 'Friends/TOGGLE_IS_FOLLOWING_PROCESS';

let Friends = {
    friends: [
        
    ],
    friendsInf: {
    
    },
    users: [

    ],
    usersInf: {
        isFetching: true,
        totalCount: 0,
        pageSize: 12,
        currentPage: 1,
    },
    followingInProcess: [],
}

const reducerFriends = (state = Friends, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_FRIENDS: 
            return {
                ...state,
                friends: action.users.filter(user => user.followed === true)
            }    
        case FOLLOW:
            let currentUser = state.users.filter((user) => {
                if (user.id === action.userId) return true;
            });
            currentUser = currentUser.find(item => item);
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
                    if(user.id === action.userId) return {...user, followed: true}
                    return user;
                }),
                friends: [...state.friends, newFriend]
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) return {...user, followed: false}
                    return user;
                }),
                friends: state.friends.filter(friend => friend.id !== action.userId)
            };
        case TOGGLE_IS_FOLLOWING_PROCESS:
            return {
                ...state,
                followingInProcess: [action.isFetching ? [action.userId] 
                : state.followingInProcess.filter(id => id !== action.userId) ]
            };
        case CHANGE_PAGE:
            return {
                ...state,
                usersInf: {...state.usersInf, currentPage: action.currentPage},
            };
        case SET_USERSINF:
            return {
                ...state,
                usersInf: {...state.usersInf, totalCount: action.data.totalCount},
            };
        case IS_FETCHING:
            return {
                ...state,
                usersInf: {...state.usersInf, isFetching: action.isFetching}
            };
        default:
            return state;
    }
}

export const follow = userId => {
    return { type: FOLLOW, userId }
}
export const unfollow = userId => {
    return { type: UNFOLLOW, userId }
}
export const setUsers = users => {
    return { type: SET_USERS, users }
}
export const changePage = currentPage => {
    return { type: CHANGE_PAGE, currentPage }
}
export const setUsersInf = data => {
    return { type: SET_USERSINF, data }
}
export const isFetching = isFetching => {
    return { type: IS_FETCHING, isFetching }
}
export const toggleFollowingInProcess = (isFetching, userId) => {
    return { type: TOGGLE_IS_FOLLOWING_PROCESS, isFetching, userId }
}
const setFriends = (users) => {
    return { type: SET_FRIENDS, users }
}

export const requestUsers = (pageSize, currentPage) => async (dispatch) => {
    dispatch(isFetching(true));
    let data = await UsersAPI.requestUsers(pageSize, currentPage);
    dispatch(isFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersInf(data));
    dispatch(setFriends(data.items));
}
export const followThunk = (userId) => async (dispatch) => {
    dispatch(toggleFollowingInProcess(true, userId));
    let data = await UsersAPI.follow(userId);
    if (data.resultCode === 0) {
        dispatch(follow(userId));
    }
    dispatch(toggleFollowingInProcess(false, userId));
}
export const unfollowThunk = (userId) => async (dispatch) => {
    dispatch(toggleFollowingInProcess(true, userId));
    let data = await UsersAPI.unfollow(userId);
    if (data.resultCode === 0) {
        dispatch(unfollow(userId));
    }
    dispatch(toggleFollowingInProcess(false, userId));
}

export default reducerFriends;