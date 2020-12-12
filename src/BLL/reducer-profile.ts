import defaultUser from './../components/Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import { ProfileAPI } from '../DAL/profileApi'
import { OptionsAPI } from "../DAL/optionsApi"
import { resultCode } from '../DAL/api'
import { setTextError, setTextErrorActionType } from './reducer-app'
import { stopSubmit } from 'redux-form'
import { RootState, InferActionTypes } from './redux'
import { ThunkAction } from 'redux-thunk'
import beautifulLight from '../components/Article/Profile/User/images/profileBackground.jpg'

const entity = 'sn/profilePage/'

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
  userId: number
}

export type postType = {
  id: number
  postTitle: string
  postInf: string
  postImg: string
  likesCount: number
}

type postNotificationType = {
  id: number
  name: string
}

export type profileNavItem = {
  id: number
  title: string
  isChosen: boolean
  path: string
}

export type profilePageType = {
  posts: Array<postType>
  postNotification: Array<postNotificationType>
  profile: profileType
  profileNavigationMenu: Array<profileNavItem>
  followed: boolean
  background: string
  isAddPostModalOpen: boolean
  isPostModalOpen: boolean
}

const profilePage = {
  posts: [],
  postNotification: [
    {
      id: 1,
      name: 'Delete Post',
    },
    {
      id: 2,
      name: 'Edit Post'
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
    userId: 0
  },
  profileNavigationMenu: [
    {
      id: 1,
      title: 'Wall',
      isChosen: false,
      path: '/'
    },
    {
      id: 2,
      title: 'Profile',
      isChosen: true,
      path: '/Profile'
    },
    {
      id: 3,
      title: 'Notifications',
      isChosen: false,
      path: '/Notifications'
    },
    {
      id: 4,
      title: 'Messages',
      isChosen: false,
      path: '/Messages'
    },
    {
      id: 5,
      title: 'Friends',
      isChosen: false,
      path: '/Friends/DataFriends'
    },
    {
      id: 6,
      title: 'Following',
      isChosen: false,
      path: '/'
    },
  ],
  followed: false,
  background: beautifulLight,
  isAddPostModalOpen: false,
  isPostModalOpen: false
} as profilePageType

const reducerProfile = (state = profilePage, action: ActionTypes): profilePageType => {
  switch (action.type) {
    case `/sn/profilePage/ADD-POST`:
      const newPost = {
        id: state.posts.length + 1,
        postTitle: action.newPostTitle,
        postInf: action.newPostInformat,
        postImg: action.postPhoto,
        likesCount: 200000
      }

      return {
        ...state,
        posts: [...state.posts as Array<postType>, newPost as postType]
      }
    case `/sn/profilePage/DELETE_POST`:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }
    case `/sn/profilePage/SET_USER_PROFILE`:
      return {
        ...state,
        profile: action.profile
      }
    case `/sn/profilePage/SET_STATUS`:
      return {
        ...state,
        profile: { ...state.profile, status: action.status }
      }
    case `/sn/profilePage/SET_USERS_PHOTO`:
      return {
        ...state,
        profile: { ...state.profile, photos: { large: action.photo, small: action.photo } }
      }
    case `/sn/profilePage/UPDATE_STATUS`:
      return {
        ...state,
        profile: { ...state.profile, status: action.status }
      }
    case `/sn/profilePage/CHANGE_USER_NAME`:
      return {
        ...state,
        profile: { ...state.profile, fullName: action.userName }
      }
    case `/sn/profilePage/EDIT-POST`:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) return { ...post, postTitle: action.newPostTitle, postInf: action.newPostInformat }
          return post
        })
      }
    case `/sn/profilePage/IS_USER_FOLLOWED`:
      return {
        ...state,
        followed: action.followed
      }
    case `/sn/profilePage/SET_IS_ADD_POST_WINDOW_OPEN`: 
      return {
        ...state,
        isAddPostModalOpen: action.modalStatus
      }  
    case `/sn/profilePage/SET_IS__POST_MODAL_OPEN`: 
      return {
        ...state,
        isPostModalOpen: action.modalStatus
      }  
    case `/sn/profilePage/CHANGE_PROFILE_NAVITEM_CHOSEN_STATUS`:
      return {
        ...state,
        profileNavigationMenu: state.profileNavigationMenu.map((item: profileNavItem) => {
          if(item.id === action.itemId) return { ...item, isChosen: true }
          return { ...item, isChosen: false }
        })
      } 
    case `/sn/profilePage/SET_STANDART_PROFILE_NAV_OPTIONS`:
      return {
        ...state,
        profileNavigationMenu: state.profileNavigationMenu.map((item: profileNavItem) => {
          if(item.id === 2) return { ...item, isChosen: true }
          return { ...item, isChosen: false }
        })
      }   
    default:
      return state
  }
}

/* Action Creators! */

type ActionTypes = InferActionTypes<typeof actions> | setTextErrorActionType

export const actions = {
  addPost: (newPostTitle: string, newPostInformat: string, postPhoto: string) => ({ type: `/sn/profilePage/ADD-POST`, newPostTitle, newPostInformat, postPhoto } as const),
  deletePost: (postId: number) => ({ type: `/sn/profilePage/DELETE_POST`, postId } as const),
  editPost: (postId: number, newPostTitle: string, newPostInformat: string) => ({ type: `/sn/profilePage/EDIT-POST`, postId, newPostTitle, newPostInformat } as const),
  setUserProfile: (profile: profileType) => ({ type: `/sn/profilePage/SET_USER_PROFILE`, profile } as const),
  setStatus: (status: string) => ({ type: `/sn/profilePage/SET_STATUS`, status } as const),
  updateStatus: (status: string) => ({ type: `/sn/profilePage/UPDATE_STATUS`, status } as const),
  setUserPhoto: (photo: string) => ({ type: `/sn/profilePage/SET_USERS_PHOTO`, photo } as const),
  changeUserName: (userName: string) => ({ type: `/sn/profilePage/CHANGE_USER_NAME`, userName } as const),
  changeContacts: (contactId: number, val: string) => ({ type: `/sn/profilePage/CHANGE_CONTACT`, contactId, val } as const),
  setIsUserFollowed: (followed: boolean) => ({ type: `/sn/profilePage/IS_USER_FOLLOWED`, followed } as const),
  setIsAddPostWindowOpen: (modalStatus: boolean) => ({ type: `/sn/profilePage/SET_IS_ADD_POST_WINDOW_OPEN`, modalStatus } as const),
  setIsPostModalOpen: (modalStatus: boolean) => ({ type: `/sn/profilePage/SET_IS__POST_MODAL_OPEN`, modalStatus } as const),
  changeProfileNavItemChosenStatus: (itemId: number) => ({ type: `/sn/profilePage/CHANGE_PROFILE_NAVITEM_CHOSEN_STATUS`, itemId } as const),
  setStandartProfileNavOptions: () => ({ type: `/sn/profilePage/SET_STANDART_PROFILE_NAV_OPTIONS` } as const)
}

/* Thunks! */

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

export const setUserPhotoThunk = (photo: File): ThunkType => async (dispatch) => {
  try {
    const data = await OptionsAPI.setUserPhoto(photo)
    if (data.resultCode === resultCode.Success) {
      dispatch(actions.setUserPhoto(data.photos.large))
    } else {
      const message = data.messages[0]
      dispatch(setTextError(message))
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const setUserProfileThunk = (userId: number): ThunkType => async (dispatch) => {
  try {
    const data = await ProfileAPI.getUsersProfile(userId)
    dispatch(actions.setUserProfile(data))
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const saveProfile = (profile: saveProfileType): ThunkType => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userId
    const profileStatus = getState().profilePage.profile.status
    const userProfilePhoto = getState().profilePage.profile.photos
    if(userId) {
      const trueProfile = {
        status: profileStatus,
        aboutMe: 'I\'m GODNESS!!!',
        userId: userId,
        lookingForAJob: true,
        lookingForAJobDescription: 'I\'m developer that has some skills: JavaScript, React.Js, TypeScript, Redux, C#, HTML, CSS, BootsTrap, SCSS and many others!',
        fullName: profile.fullName,
        contacts: profile.contacts,
        photos: userProfilePhoto
      }
      const data = await ProfileAPI.saveProfile(trueProfile)
      if (data.resultCode === resultCode.Success) {
        dispatch(setUserProfileThunk(userId))
      } else {
        const error = data.messages[0]
        const action: any = stopSubmit('ChangeContacts', { _error: error })
        dispatch(action)
      }
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const setStatusThunk = (userId: number): ThunkType => async (dispatch) => {
  try {
    const data = await ProfileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
  } catch (error) {
    console.log(error)
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
  try {
    const data = await ProfileAPI.updateStatus(status)
    dispatch(actions.updateStatus(data))
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const getIsUserFollowed = (userId: number): ThunkType => async (dispatch) => {
  try {
    const res = await ProfileAPI.getIsUserFollowed(userId)
    dispatch(actions.setIsUserFollowed(res.data))
  } catch (e) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export default reducerProfile