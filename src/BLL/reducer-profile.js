import MyAvatar from '../components/Article/Profile/images/myAvatar/avatar.jpg';
import { ProfileAPI } from '../DAL/api';
import { OptionsAPI } from "../DAL/api";
import { setTextError } from './reducer-app';

const ADD_POST = 'profilePage/ADD-POST';
const DELETE_POST = 'profilePage/DELETE_POST';
const EDIT_POST = 'profilePage/EDIT-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const UPDATE_STATUS = 'profilePage/UPDATE_STATUS';
const SET_USERS_PHOTO = 'profilePage/SET_USERS_PHOTO';
const CHANGE_USER_NAME = 'profilePage/CHANGE_USER_NAME';
 

let profilePage = {
  posts: [
    
  ],
  postNotification: [
    {
      id: 1,
      name: 'Delete Post',
    }
  ],
  profile: {
    status: "Hello my friends! I'm GOD!!!",
    aboutMe: 'What can I say new?! I\'m GOD!!!',
    contacts: [
      {
        id: 0,
        title: 'Facebook',
        value: "facebook.com"
      },
      {
        id: 1,
        title: 'Website',
        value: "http://localhost:3000/"
      },
      {
        id: 2,
        title: 'Vk',
        value: "vk.com"
      },
      {
        id: 3,
        title: 'Twitter',
        value: "https://twitter.com"
      },
      {
        id: 4,
        title: 'Instagram',
        value: "instagram.com"
      },
      {
        id: 5,
        title: 'Youtube',
        value: "https://www.youtube.com/"
      }, 
      {
        id: 6,
        title: 'Github',
        value: "github.com"
      },
      {
        id: 7,
        title: 'MainLink',
        value: "http://localhost:3000/Profile/7149"
      },
    ],
    fullName: "LightL2",
    photos: {
      large: MyAvatar,
      small: MyAvatar,
    },
    userId: 7149,
  }
}

const reducerProfile = (state = profilePage, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.posts.length + 1,
        postTitle: action.newPostTitle,
        postInf: action.newPostInformat,
        likesCount: 200000,
      }
      
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      };
    case SET_USER_PROFILE:
      let contacts = [];
      let profile = {...action.profile};
      profile.contacts = {...action.profile.contacts};

      for(let key in profile.contacts) {
        contacts.push({
          title: key,
          value: profile.contacts[key]
        });
      }
      profile.contacts = [...contacts];
      for (let i = 0; i<=profile.contacts.length - 1; i++) {
        profile.contacts[i].id = i;
      }

      return {
        ...state,
        profile: profile
      };
    case SET_STATUS:
      return {
        ...state,
        profile: {...state.profile, status: action.status}
      };
    case SET_USERS_PHOTO:
      return {
        ...state,
        profile: {...state.profile},
        photos: {
          large: action.photo,
          small: action.photo
        },
      };
    case CHANGE_USER_NAME:
      return {
        ...state,
        profile: {...state.profile,  fullName: action.userName},
      };
    case EDIT_POST: 
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) return {...post, postTitle: action.newPostTitle, postInf: action.newPostInformat}
          return post;
        })
      }
    default:
      return state;
  }
}

/* Action Creators! */

export const addPost = (newPostTitle, newPostInformat) => {
  return { type: ADD_POST, newPostTitle, newPostInformat };
}
export const deletePost = (postId) => {
  return { type: DELETE_POST, postId }
}
export const editPost = (postId, newPostTitle, newPostInformat) => {
  return { type: EDIT_POST, postId, newPostTitle, newPostInformat }
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
const setUserPhoto = (photo) => {
  return { type: SET_USERS_PHOTO, photo }
}
export const changeUserName = (userName) => {
  return { type: CHANGE_USER_NAME, userName }
}

/* Thunks! */

export const setUserPhotoThunk = (photo) => async (dispatch) => {
  let data = await OptionsAPI.setUserPhoto(photo);
  debugger
  if (data.resultCode === 0) {
    debugger
    dispatch(setUserPhoto(photo));
  } else {
    let message = data.messages[0];
    dispatch(setTextError(message));
  }
}

export const setUserProfileThunk = (userId) => async (dispatch) => {
  let data = await ProfileAPI.getUsersProfile(userId);
  dispatch(setUserProfile(data));
}
export const setStatusThunk = (userId) => async (dispatch) => {
  let data = await ProfileAPI.getStatus(userId)
  dispatch(setStatus(data));
}
export const updateStatusThunk = (status) => async (dispatch) => {
  let data = await ProfileAPI.updateStatus(status);
  dispatch(updateStatus(data));
}

export default reducerProfile;