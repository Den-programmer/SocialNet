import avatar from '../images/users/unfollowed-user.jpg';

const FOLLOWED = 'FOLLOWED';
const UNFOLLOWED = 'UNFOLLOWED';

let users = {
    users: [
        {
            id: 1,
            nickname: 'Alina',
            name: "Alina",
            avatar: avatar,
            followed: false,
        },
        {
            id: 2,
            nickname: 'Alina',
            name: "Alina",
            avatar: avatar,
            followed: true,
        },
        {
            id: 3,
            nickname: 'Alina',
            name: "Alina",
            avatar: avatar,
            followed: false,
        }, 
        {
            id: 4,
            nickname: 'Alina',
            name: "Alina",
            avatar: avatar,
            followed: true,
        }, 
    ],
}

const reducerUsers = (state = users, action) => {
    if (action.type === FOLLOWED) {
        let stateCopy = {...state}
        stateCopy.users = [...state.users];


        return stateCopy;
    } else if (action.type === UNFOLLOWED) {
        let stateCopy = {...state}
        stateCopy.users = [...state.users];

        return stateCopy;
    }

    return state;
}

export let followAC = (subscribe) => {
    return({ type: FOLLOWED, subscribe: subscribe, });
}
export let unfollowAC = (subscribe) => {
    return ({ type: UNFOLLOWED, subscribe: subscribe, });
} 

export default reducerUsers;