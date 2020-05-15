import MyAvatar from '../components/Article/Profile/images/userDeafultAvatar/avatar.jpg';
import { ProfileAPI } from '../DAL/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_STATUS = 'UPDATE_STATUS';


let profilePage = {
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
    status: "Hello my friends! I\'m GOD!!!",
    aboutMe: 'What can I say new?! I\'m GOD!!!',
    contacts: {
      facebook: "facebook.com",
      website: null,
      github: "github.com",
      instagram: "instagram.com",
      mainLink: null,
      twitter: "https://twitter.com",
      vk: "vk.com",
      youtube: null
    },
    fullName: "LightL2",
    photos: {
      large: MyAvatar,
      small: MyAvatar,
    },
    userId: 7735794,
  },
}

const reducerProfile = (state = profilePage, action) => {
  let stateCopy = { ...state }
  stateCopy.posts = [...state.posts]
  stateCopy.profile = { ...state.profile };

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: stateCopy.posts.length + 1,
        postTitle: action.newPostTitle,
        postInf: action.newPostInformat,
        likesCount: 200000,
      }
      stateCopy.posts.push(newPost);
      stateCopy.ValueOfPostTitle = '';
      stateCopy.ValueOfPostInf = '';

      return stateCopy;
    case SET_USER_PROFILE:
      stateCopy.profile = action.profile;

      return stateCopy;
    case SET_STATUS:
      stateCopy.profile.status = action.status;

      return stateCopy;
    case UPDATE_STATUS:
      stateCopy.profile.status = action.status;
      
      return stateCopy;
    default:
      return state;
  }
}

export const addPost = (newPostTitle, newPostInformat) => {
  return { type: ADD_POST, newPostTitle, newPostInformat };
}
const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile }
}
const setStatus = (status) => {
  return { type: SET_STATUS, status }
}
const updateStatus = (status) => {
  return { type: UPDATE_STATUS, status }
}

export const setUserProfileThunk = (userId) => {
  return (dispatch) => {
    ProfileAPI.getUsersProfile(userId).then(data => {
      dispatch(setUserProfile(data));
    });
  }
}
export const setStatusThunk = (userId) => {
  return (dispatch) => {
    ProfileAPI.getStatus(userId).then(data => {
      dispatch(setStatus(data));
    });
  }
}
export const updateStatusThunk = (status) => {
  return (dispatch) => {
    ProfileAPI.updateStatus(status).then(data => {
      dispatch(updateStatus(data));
    });
  }
}

export default reducerProfile;