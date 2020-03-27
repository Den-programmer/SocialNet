import avatar1 from '../images/friends-avatars/friend1.jpg';
import avatar2 from '../images/friends-avatars/friend2.jpg';
import avatar3 from '../images/friends-avatars/friend3.jpg';

export let Friends = {
    friends: [
        {
            id: 1,
            name: 'Hayden',
            avatar: avatar1,
        },
        {
            id: 2,
            name: 'Lil',
            avatar: avatar2,
        },
        {
            id: 3,
            name: 'Alex',
            avatar: avatar3,
        },
    ],
}

const reducerFriends = (state = Friends, action) => {





    return state;
}

export default reducerFriends;