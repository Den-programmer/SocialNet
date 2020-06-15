import avatar1 from '../images/friends-avatars/avatar1.jpg';
import avatar2 from '../images/friends-avatars/avatar2.jpg';
import avatar3 from '../images/friends-avatars/avatar3.jpg';
import avatar4 from '../images/friends-avatars/avatar4.jpg';
import avatar5 from '../images/friends-avatars/avatar5.jpg';
import avatar6 from '../images/friends-avatars/avatar6.png';
import avatar7 from '../images/friends-avatars/avatar7.jpg';
import avatar8 from '../images/friends-avatars/avatar8.jpg';
import avatar9 from '../images/friends-avatars/avatar9.jpg';
import avatar10 from '../images/friends-avatars/avatar10.jpg';
import { UsersAPI } from '../DAL/api';

const FOLLOW = 'Friends/FOLLOW';
const UNFOLLOW = 'Friends/UNFOLLOW';
const SET_USERS = 'Friends/SET-USERS';
const CHANGE_PAGE = 'Friends/CHANGE-PAGE';
const SET_USERSINF = 'Friends/SET-USERSINF';
const IS_FETCHING = 'Friends/IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROCESS = 'Friends/TOGGLE_IS_FOLLOWING_PROCESS';

let Friends = {
    friends: [
        {
            id: 1,
            nickname: 'John',
            name: 'John',
            avatar: avatar1,
            followed: true,
        },
        {
            id: 2,
            nickname: 'Alan',
            name: 'Alan',
            avatar: avatar2,
            followed: true,
        },
        {
            id: 3,
            nickname: 'Josh',
            name: 'Josh',
            avatar: avatar3,
            followed: true,
        },
        {
            id: 4,
            nickname: 'Jake',
            name: 'Jake',
            avatar: avatar4,
            followed: true,
        },
        {
            id: 5,
            nickname: 'Chris',
            name: 'Chris Heria',
            avatar: avatar5,
            followed: true,
        },
        {
            id: 6,
            nickname: 'LilPipka',
            name: 'Lil',
            avatar: avatar6,
            followed: true,
        },
        {
            id: 7,
            nickname: 'Thomas',
            name: 'Thomas',
            avatar: avatar7,
            followed: true,
        },
        {
            id: 8,
            nickname: 'Static_Alex',
            name: 'Alex',
            avatar: avatar8,
            followed: true,
        },
        {
            id: 9,
            nickname: 'Hayden',
            name: 'Hayden Cristian',
            avatar: avatar9,
            followed: true,
        },
        {
            id: 10,
            nickname: 'Yana',
            name: 'Yana',
            avatar: avatar10,
            followed: true,
        },
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
                followingInProcess: [action.isFetching ? [...state.followingInProcess, action.userId] 
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

export const requestUsers = (pageSize, currentPage) => async (dispatch) => {
    dispatch(isFetching(true));
    let data = await UsersAPI.requestUsers(pageSize, currentPage);
    dispatch(isFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersInf(data));
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