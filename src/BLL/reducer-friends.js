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

let Friends = {
    friends: [
        {
            id: 1,
            nickname:'John',
            name: 'John',
            avatar: avatar1,
        },
        {
            id: 2,
            nickname: 'Alan',
            name: 'Alan',
            avatar: avatar2,
        },
        {
            id: 3,
            nickname: 'Josh',
            name: 'Josh',
            avatar: avatar3,
        },
        {
            id: 4,
            nickname:'Jake',
            name: 'Jake',
            avatar: avatar4,
        },
        {
            id: 5,
            nickname:'Chris',
            name: 'Chris Heria',
            avatar: avatar5,
        },
        {
            id: 6,
            nickname:'LilPipka',
            name: 'Lil',
            avatar: avatar6,
        },
        {
            id: 7,
            nickname:'Thomas',
            name: 'Thomas',
            avatar: avatar7,
        },
        {
            id: 8,
            nickname:'Static_Alex',
            name: 'Alex',
            avatar: avatar8,
        },
        {
            id: 9,
            nickname:'Hayden',
            name: 'Hayden Cristian',
            avatar: avatar9,
        },
        {
            id: 10,
            nickname:'Yana',
            name: 'Yana',
            avatar: avatar10,
        },
    ],
}
// Если имена не помещаються в сайдбар, тогда присвой им фиксированою ширину!
const reducerFriends = (state = Friends, action) => {

    return state;
}

export default reducerFriends;