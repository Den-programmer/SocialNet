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

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const CHANGE_PAGE = 'CHANGE-PAGE';
const SET_USERSINF = "SET-USERSINF";

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
        totalCount: 0,
        pageSize: 12,
        currentPage: 1,
    }
}

const reducerFriends = (state = Friends, action) => {

    let stateCopy = { ...state }
    stateCopy.friends = [...state.friends];
    stateCopy.users = [...state.users];
    stateCopy.friendsInf = { ...state.friendsInf }
    stateCopy.usersInf = { ...state.usersInf }
    stateCopy.users.map(u => {
        return { ...u }
    });
    stateCopy.friends = state.friends.map(friend => {
        return { ...friend }
    });
    switch (action.type) {
        case SET_USERS:
            stateCopy.users = action.users;

            return stateCopy;
        case FOLLOW:
            stateCopy.users.forEach(u => {
                if (u.id == action.userId) {
                    u.followed = true;
                }
            });
            let currentUser = stateCopy.users.filter((user) => {
                if (user.id == action.userId) {
                    return true;
                }
            });
            currentUser = currentUser.find(item => item);
            let newFriend = {
                id: action.userId,
                name: currentUser.name,
                nickname: currentUser.nickname,
                avatar: currentUser.avatar,
                followed: true,
            }
            stateCopy.friends.push(newFriend);

            return stateCopy;
        case UNFOLLOW:
            stateCopy.users.forEach(u => {
                if (u.id == action.userId) {
                    u.followed = false;
                }
            });
            let newArrayFriends = stateCopy.friends.filter(friend => {
                if (friend.id !== action.userId) {
                    return true;
                }
            });
            stateCopy.friends = [...newArrayFriends];

            return stateCopy;
        case CHANGE_PAGE:
            stateCopy.usersInf.currentPage = action.currentPage;

            return stateCopy;
        case SET_USERSINF:
            stateCopy.usersInf.totalCount = action.data.totalCount;

            return stateCopy;
        default:  
            return state;    
    }
}

export const followAC = (userId) => {
    return { type: FOLLOW, userId: userId, }
}
export const unfollowAC = (userId) => {
    return { type: UNFOLLOW, userId: userId, }
}
export const setUsersAC = (users) => {
    return { type: SET_USERS, users: users }
}
export const onPageChangeAC = (currentPage) => {
    return { type: CHANGE_PAGE, currentPage }
}
export const setUsersInfAC = data => {
    return { type: SET_USERSINF, data }
}

export default reducerFriends;