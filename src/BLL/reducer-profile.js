import MyAvatar from '../components/Article/Profile/images/myAvatar/avatar.jpg';
import { ProfileAPI } from '../DAL/api';
import { OptionsAPI } from "../DAL/api";
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST'; 
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_STATUS = 'UPDATE_STATUS';
const SET_USERS_PHOTO = 'SET_USERS_PHOTO';
const CHANGE_USER_NAME = 'CHANGE_USER_NAME';


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
  stateCopy.profile.photos = {...state.profile.photos}

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: stateCopy.posts.length + 1,
        postTitle: action.newPostTitle,
        postInf: action.newPostInformat,
        likesCount: 200000,
      }
      stateCopy.posts.push(newPost);

      return stateCopy;
    case DELETE_POST: 
      stateCopy.posts.filter(post => {
        if(post.id !== action.postId) {
          return true;
        }
      });  

      return stateCopy;
    case SET_USER_PROFILE:
      stateCopy.profile = action.profile;

      // Create correct object!

      return stateCopy;
    case SET_STATUS:
      stateCopy.profile.status = action.status;

      return stateCopy;
    case SET_USERS_PHOTO: 
      stateCopy.profile.photos.large = action.photo;
      stateCopy.profile.photos.small = action.photo;

      return stateCopy;
    case CHANGE_USER_NAME: 
      stateCopy.profile.fullName = action.userName;

      return stateCopy;
    default:
      return state;
  }
}

/* Action Creators! */

export const addPost = (newPostTitle, newPostInformat) => {
  return { type: ADD_POST, newPostTitle, newPostInformat };
}
export const deletePost = (postId) => {
  return { DELETE_POST, postId }
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

export const setUserPhotoThunk = (photo) => {
  return (dispatch) => {
      OptionsAPI.setUserPhoto(photo).then(data => {
          if (data.resultCode === 0) {
            dispatch(setUserPhoto(photo));
          } else {
            let action = stopSubmit('editUserAvatar', {_error: 'Choose correct image file!'});
            dispatch(action);
          }
      });      
  }
}
export const setUserProfileThunk = (userId) => {
  return (dispatch) => {
    ProfileAPI.getUsersProfile(userId).then(data => {
      let {facebook, github, instagram, mainLink, twitter, vk, website, youtube} = data.contacts;
      // можешь сделать код как-нибудь, но потом перепишы его(оптимизируй)!
      // Оптимизация - цыклы и spread оператор, куча кода!!!
      let contacts = [
        {
          id: 1,
          title: 'Facebook',
          value: facebook
        },
        {
          id: 2,
          title: 'Website',
          value: website
        },
        {
          id: 3,
          title: 'Github',
          value: github
        },
        {
          id: 4,
          title: 'Instagram',
          value: instagram
        },
        {
          id: 5,
          title: 'MainLink',
          value: mainLink
        },
        {
          id: 6,
          title: 'Twitter',
          value: twitter
        },
        {
          id: 7,
          title: 'Vk',
          value: vk
        },
        {
          id: 8,
          title: 'Youtube',
          value: youtube
        },
      ];
      data.contacts = contacts;
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