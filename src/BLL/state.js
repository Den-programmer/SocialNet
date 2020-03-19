import avatar1 from '../images/friends-avatars/friend1.jpg';
import avatar2 from '../images/friends-avatars/friend2.jpg';
import avatar3 from '../images/friends-avatars/friend3.jpg';

let rerenderEntireTree = () => {
  console.log(' This is the function that will be changed! ');
}

export let subscribe = (observer) => {
  rerenderEntireTree = observer;
} 


let state = {
  profilePage: {
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
    ValueOfPostTitle: '',
    ValueOfPostInf: '',
  },
  messagesPage: {
    dialogsData: [
      {
        id: 1,
        name: 'John',
        lastMessage: 'Hello!',
      },
      {
        id: 2,
        name: 'Alan',
        lastMessage: 'Hi!',
      },
      {
        id: 3,
        name: 'Josh',
        lastMessage: 'The last message I\'ve written you!',
      },
      {
        id: 4,
        name: 'Jake',
        family: 'Hill',
        lastMessage: 'See you soon!',
      },
      {
        id: 5,
        name: 'Chris',
        lastMessage: 'I Love You!',
      },
      {
        id: 6,
        name: 'Lil',
        lastMessage: 'Rate my new song please!',
      },
      {
        id: 7,
        name: 'Thomas',
        lastMessage: 'Hey, how is it going?',
      },
      {
        id: 8,
        name: 'Alex',
        lastMessage: 'She was the one with the broken smile...',
      },
      {
        id: 9,
        name: 'Hayden',
        lastMessage: 'Car engine died!',
      },
      {
        id: 10,
        name: "Yana",
        lastMessage: "Everything will be alright!",
      }
    ]
  },
  newsPage: {

  },
  musicPage: {

  },
  optionsPage: {

  },
  Friends: {
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
  },
  Footer: {
    year: 2020,
    footInf: 'This is foot information!',
    footLinks: [
      {
        id: 1,
        name: 'NavLink',
        url: "#",
      },
      {
        id: 2,
        name: 'NavLink',
        url: "#",
      },
      {
        id: 3,
        name: 'NaVLink',
        url: "#",
      },
      {
        id: 4,
        name: 'NavLink',
        url: "#",
      },
      {
        id: 5,
        name: 'NavLink',
        url: "#",
      },
    ],
  },
}

export const addpost = (newPostTitle, newPostInformat) => {
  let newPost = {
    id: state.profilePage.posts.length + 1,
    postTitle: newPostTitle,
    postInf: newPostInformat,
    likesCount: 200000,
  }
  state.profilePage.posts.push(newPost);
  rerenderEntireTree();
}

export default state;
