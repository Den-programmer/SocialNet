import defaultUser from './../components/Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import { ProfileAPI } from '../DAL/profileApi'
import { OptionsAPI } from "../DAL/optionsApi"
import { resultCode } from '../DAL/api'
import { setTextError, setTextErrorActionType } from './reducer-app'
import { stopSubmit } from 'redux-form'
import { RootState } from './redux'
import { ThunkAction } from 'redux-thunk'

const ADD_POST = 'profilePage/ADD-POST'
const DELETE_POST = 'profilePage/DELETE_POST'
const EDIT_POST = 'profilePage/EDIT-POST'
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE'
const SET_STATUS = 'profilePage/SET_STATUS'
const UPDATE_STATUS = 'profilePage/UPDATE_STATUS'
const SET_USERS_PHOTO = 'profilePage/SET_USERS_PHOTO'
const CHANGE_USER_NAME = 'profilePage/CHANGE_USER_NAME'
const CHANGE_CONTACT = 'CHANGE_CONTACT'

export type profilePhotosType = {
  large: string
  small: string
}
export type contactsType = {
  facebook: string | null
  website: string | null
  vk: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  github: string | null
  mainLink: string | null
}

export type saveProfileType = {
  fullName: string
  contacts: contactsType
}

export type profileType = {
  status: string
  aboutMe: null | string
  contacts: contactsType
  fullName: string
  photos: profilePhotosType
  userId: null | number
}

export type postType = {
  id: number
  postTitle: string
  postInf: string
  likesCount: number
}
type postNotificationType = {
  id: number
  name: string
}

export type profilePageType = {
  posts: Array<postType>
  postNotification: Array<postNotificationType>
  profile: profileType
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
      small: defaultUser
    },
    userId: null
  } 
} as profilePageType

const reducerProfile = (state = profilePage, action: ActionTypes): profilePageType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.posts.length + 1,
        postTitle: action.newPostTitle,
        postInf: action.newPostInformat,
        likesCount: 200000
      } 

      return {
        ...state,
        posts: [...state.posts as Array<postType>, newPost as postType]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state,
        profile: { ...state.profile, status: action.status }
      }
    case SET_USERS_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: { large: action.photo, small: action.photo } }
      }
    case CHANGE_USER_NAME:
      return {
        ...state,
        profile: { ...state.profile, fullName: action.userName }
      }
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) return { ...post, postTitle: action.newPostTitle, postInf: action.newPostInformat }
          return post
        })
      }
    default:
      return state
  }
}

/* Action Creators! */

type ActionTypes = addPostActionType | 
deletePostActionType | 
editPostActionType | 
setUserProfileActionType | 
setStatusActionType | 
updateStatusActionType| 
setUserPhotoActionType | 
changeUserNameActionType | 
changeContactsActionType |
setTextErrorActionType

type addPostActionType = {
  type: typeof ADD_POST
  newPostTitle: string
  newPostInformat: string
}

export const addPost = (newPostTitle: string, newPostInformat: string):addPostActionType => {
  return { type: ADD_POST, newPostTitle, newPostInformat }
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
  profile: profileType
}

const setUserProfile = (profile: profileType):setUserProfileActionType => {
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

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

export const setUserPhotoThunk = (photo: any):ThunkType => async (dispatch) => {
  try {
    let data = await OptionsAPI.setUserPhoto(photo)
    debugger
    if (data.resultCode === resultCode.Success) {
      dispatch(setUserPhoto(photo))
    } else {
      let message = data.messages[0]
      dispatch(setTextError(message))
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const setUserProfileThunk = (userId: number | null):ThunkType => async (dispatch) => {
  try {
    let data = await ProfileAPI.getUsersProfile(userId)
    dispatch(setUserProfile(data))
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const saveProfile = (profile: saveProfileType):ThunkType => async (dispatch, getState) => {
  try {
    let userId = getState().auth.userId
    let profileStatus = getState().profilePage.profile.status
    let userProfilePhoto = getState().profilePage.profile.photos
    let trueProfile = {
      status: profileStatus,
      aboutMe: 'I\'m GODNESS!!!',
      userId: userId,
      lookingForAJob: true,
      lookingForAJobDescription: 'I\'m developer that has some skills: JavaScript, React.Js, TypeScript, Redux, C#, HTML, CSS, BootsTrap, SCSS and many others!',
      fullName: profile.fullName,
      contacts: profile.contacts,
      photos: userProfilePhoto
    }
    let data = await ProfileAPI.saveProfile(trueProfile)
    if (data.resultCode === resultCode.Success) {
      dispatch(setUserProfileThunk(userId))
    } else {
      let error = data.messages[0]
      let action: any = stopSubmit('ChangeContacts', { _error: error })
      dispatch(action)
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const setStatusThunk = (userId: number):ThunkType => async (dispatch) => {
  try {
    let data = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(data))
  } catch (error) {
    console.log(error)
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const updateStatusThunk = (status: string):ThunkType => async (dispatch) => {
  try {
    let data = await ProfileAPI.updateStatus(status)
    dispatch(updateStatus(data))
  } catch (error) {
    console.log(error)
    alert(`Something's gone wrong, error status: 500`)
  }
}

export default reducerProfile