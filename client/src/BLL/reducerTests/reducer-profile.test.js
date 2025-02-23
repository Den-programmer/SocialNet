import reducerProfile from '../reducer-profile';
import { addPost } from '../reducer-profile';
import { deletePost } from '../reducer-profile';
 
let state = {
    posts: [
        {
            id: 1,
            postTitle: "It's a post!@",
            postInf: "This post has no meaning!",
            likesCount: 200000,
        },
        {
            id: 2,
            postTitle: "It's a post!@",
            postInf: "This post has no meaning!",
            likesCount: 200000,
        },
        {
            id: 3,
            postTitle: "It's a post!@",
            postInf: "This post has no meaning!",
            likesCount: 200000,
        },
    ],
    profile: {
        status: "Hello my friends! I'm GOD!!!",
        aboutMe: 'What can I say new?! I\'m GOD!!!',
        contacts: [
            {
                id: 1,
                title: 'Facebook',
                value: "facebook.com"
            },
            {
                id: 2,
                title: 'Website',
                value: "http://localhost:3000/"
            },
            {
                id: 3,
                title: 'Github',
                value: "github.com"
            },
            {
                id: 4,
                title: 'Instagram',
                value: "instagram.com"
            },
            {
                id: 5,
                title: 'MainLink',
                value: "http://localhost:3000/Profile/7149"
            },
            {
                id: 6,
                title: 'Twitter',
                value: "https://twitter.com"
            },
            {
                id: 7,
                title: 'Vk',
                value: "vk.com"
            },
            {
                id: 8,
                title: 'Youtube',
                value: "https://www.youtube.com/"
            },
        ],
        fullName: "LightL2",
        photos: {
            large: "avatar",
            small: "avatar"
        },
        userId: 7735794,
    },
}

test('The length of posts should be incremented!', () => {
    let action = addPost('Some text that has no meaning!');

    let newState = reducerProfile(state, action);
    expect(newState.posts.length).toBe(4);
});

test('The length of posts after deleting should be decrement!', () => {
    let action = deletePost(1);

    let newState = reducerProfile(state, action);
    expect(newState.posts.length).toBe(2);
});