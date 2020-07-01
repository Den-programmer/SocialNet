import defaultUser from './../components/Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg';
import { ProfileAPI } from '../DAL/api';
import { OptionsAPI } from "../DAL/api";
import { setTextError } from './reducer-app';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'profilePage/ADD-POST';
const DELETE_POST = 'profilePage/DELETE_POST';
const EDIT_POST = 'profilePage/EDIT-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const UPDATE_STATUS = 'profilePage/UPDATE_STATUS';
const SET_USERS_PHOTO = 'profilePage/SET_USERS_PHOTO';
const CHANGE_USER_NAME = 'profilePage/CHANGE_USER_NAME';
const CHANGE_CONTACT = 'CHANGE_CONTACT';

type profilePhotosType = {
  large: any
  small: any
}
type contactsType = {
  facebook: null | string,
  website: null | string,
  vk: null | string,
  twitter: null | string,
  instagram: null | string,
  youtube: null | string,
  github: null | string,
  mainLink: null | string
}
type profileType = {
  status: null | string
  aboutMe: null | string
  contacts: contactsType
  fullName: string
  photos: profilePhotosType
  userId: null | number
}

type postType = {
  id: number
  postTitle: string
  postInf: string
  likesCount: number
}
type postNotificationType = {
  id: number
  name: string
}

type saveProfileType = {
  fullName: string
  contacts: contactsType
}
export type profilePageType = {
  posts: Array<postType>,
  postNotification: Array<postNotificationType>,
  profile: profileType,
}

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
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      mainLink: null
    },
    fullName: "Your nickname",
    photos: {
      large: defaultUser,
      small: defaultUser,
    },
    userId: null,
  } 
} as profilePageType

const reducerProfile = (state = profilePage, action: any): profilePageType => {
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
        posts: [...state.posts as Array<postType>, newPost as postType]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_STATUS:
      return {
        ...state,
        profile: { ...state.profile, status: action.status }
      };
    case SET_USERS_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: { large: action.photo, small: action.photo } },
      };
    case CHANGE_USER_NAME:
      return {
        ...state,
        profile: { ...state.profile, fullName: action.userName },
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) return { ...post, postTitle: action.newPostTitle, postInf: action.newPostInformat }
          return post;
        })
      }
    default:
      return state;
  }
}

/* Action Creators! */

type addPostActionType = {
  type: typeof ADD_POST
  newPostTitle: string
  newPostInformat: string
}

export const addPost = (newPostTitle: string, newPostInformat: string):addPostActionType => {
  return { type: ADD_POST, newPostTitle, newPostInformat };
}

type deletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId: number):deletePostActionType => {
  return { type: DELETE_POST, postId }
}

type editPostActionType = {
  type: typeof EDIT_POST
  postId: number
  newPostTitle: string
  newPostInformat: string
}

export const editPost = (postId: number, newPostTitle: string, newPostInformat: string):editPostActionType => {
  return { type: EDIT_POST, postId, newPostTitle, newPostInformat }
}

type setUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: object
}

const setUserProfile = (profile: object):setUserProfileActionType => {
  return { type: SET_USER_PROFILE, profile }
}

type setStatusActionType = {
  type: typeof SET_STATUS
  status: string
}

const setStatus = (status: string):setStatusActionType => {
  return { type: SET_STATUS, status }
}

type updateStatusActionType = {
  type: typeof UPDATE_STATUS
  status: string
}

const updateStatus = (status: string):updateStatusActionType => {
  return { type: UPDATE_STATUS, status }
}

type setUserPhotoActionType = {
  type: typeof SET_USERS_PHOTO
  photo: any
}

const setUserPhoto = (photo: any):setUserPhotoActionType => {
  return { type: SET_USERS_PHOTO, photo }
}

type changeUserNameActionType = {
  type: typeof CHANGE_USER_NAME
  userName: string
}

export const changeUserName = (userName: string):changeUserNameActionType => {
  return { type: CHANGE_USER_NAME, userName }
}

type changeContactsActionType = {
  type: typeof CHANGE_CONTACT
  contactId: number
  val: string
}

export const changeContacts = (contactId: number, val: string):changeContactsActionType => {
  return { type: CHANGE_CONTACT, contactId, val }
}

/* Thunks! */

export const setUserPhotoThunk = (photo: any) => async (dispatch: any) => {
  try {
    let data = await OptionsAPI.setUserPhoto(photo);
    debugger
    if (data.resultCode === 0) {
      dispatch(setUserPhoto(photo));
    } else {
      let message = data.messages[0];
      dispatch(setTextError(message));
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}

export const setUserProfileThunk = (userId: number) => async (dispatch: any) => {
  try {
    let data = await ProfileAPI.getUsersProfile(userId);
    dispatch(setUserProfile(data));
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}
export const saveProfile = (profile: saveProfileType) => async (dispatch: any, getState: any) => {
  try {
    let userId = getState().auth.userId;
    let trueProfile = {
      aboutMe: 'I\'m GODNESS!!!',
      userId: userId,
      lookingForAJob: true,
      lookingForAJobDescription: 'I\'m developer that has some skills: JavaScript, React.Js, TypeScript, Redux, C#, HTML, CSS, BootsTrap, SCSS and many others!',
      fullName: profile.fullName,
      contacts: profile.contacts,
    }
    let data = await ProfileAPI.saveProfile(trueProfile);
    if (data.resultCode === 0) {
      dispatch(setUserProfileThunk(userId));
    } else {
      let error = data.messages[0];
      dispatch(stopSubmit('ChangeContacts', { _error: error }));
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}
export const setStatusThunk = (userId: number) => async (dispatch: any) => {
  try {
    let data = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(data));
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}
export const updateStatusThunk = (status: string) => async (dispatch: any) => {
  try {
    let data = await ProfileAPI.updateStatus(status);
    dispatch(updateStatus(data));
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}

export default reducerProfile;