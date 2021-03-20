import defaultUser from './../components/Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import { ProfileAPI } from '../DAL/profileApi'
import { OptionsAPI } from "../DAL/optionsApi"
import { resultCode } from '../DAL/api'
import { setTextError, setTextErrorActionType } from './reducer-app'
import { RootState, InferActionTypes } from './redux'
import { ThunkAction } from 'redux-thunk'
import beautifulLight from '../components/Article/Profile/User/images/profileBackground.jpg'
import { postType, postNotificationType, profileNavItem, ChangePhotosMenuItemType, profileType, saveProfileType } from '../types/ProfileTypes/profileTypes'

const entity = 'sn/profilePage/'

const profilePage = {
  posts: [] as Array<postType>,
  postNotification: [
    {
      id: 1,
      name: 'Delete Post',
    },
    {
      id: 2,
      name: 'Edit Post'
    }
  ] as Array<postNotificationType>,
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
  } as profileType,
  profileNavigationMenu: [
    {
      id: 7012,
      title: 'Wall',
      isChosen: false,
      path: '/Wall'
    },
    {
      id: 7001,
      title: 'Profile',
      isChosen: true,
      path: '/Profile'
    },
    {
      id: 7013,
      title: 'Notifications',
      isChosen: false,
      path: '/Notifications'
    },
    {
      id: 7002,
      title: 'Messages',
      isChosen: false,
      path: '/Messages'
    },
    {
      id: 7006,
      title: 'Friends',
      isChosen: false,
      path: '/Friends/DataFriends'
    },
    {
      id: 7014,
      title: 'Following',
      isChosen: false,
      path: '/'
    },
  ] as Array<profileNavItem>,
  changePhotosMenu: [
    {
      id: 1,
      title: 'Change profile photo',
      isActive: true
    },
    {
      id: 2,
      title: 'Delete profile photo',
      isActive: false
    },
    {
      id: 3,
      title: 'Change background photo',
      isActive: false
    }
  ] as Array<ChangePhotosMenuItemType>,
  changePhotosMenuItemId: 1,
  followed: false,
  background: beautifulLight,
  gender: 'Not Chosen',
  isAddPostModalOpen: false,
  isPostModalOpen: false,
  isMembersColumnOpen: true
} 

const reducerProfile = (state = profilePage, action: ActionTypes): typeof profilePage => {
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
          if (item.id === action.itemId) return { ...item, isChosen: true }
          return { ...item, isChosen: false }
        })
      }
    case `/sn/profilePage/CHANGE_GENDER`:
      return {
        ...state,
        gender: action.gender
      }
    case `/sn/profilePage/CHANGE_PHOTOS_MENU_ITEM`:
      return {
        ...state,
        changePhotosMenu: state.changePhotosMenu.map((item: ChangePhotosMenuItemType) => {
          if(action.itemId === item.id) return { ...item, isActive: true }
          return { ...item, isActive: false }
        }),
        changePhotosMenuItemId: action.itemId
      }  
    case `/sn/profilePage/SET_PROFILE_BACKGROUND`:
      const background = URL.createObjectURL(action.photo)
      return {
        ...state,
        background
      }  
    case `/sn/profilePage/CHANGE_MEMBERS_COLUMN_OPENED_STATUS`:
      return {
        ...state,
        isMembersColumnOpen: action.status
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
  changeGender: (gender: string) => ({ type: `/sn/profilePage/CHANGE_GENDER`, gender } as const),
  choosePhotosMenuItem: (itemId: number) => ({ type: `/sn/profilePage/CHANGE_PHOTOS_MENU_ITEM`, itemId } as const),
  setProfileBackground: (photo: File) => ({ type: `/sn/profilePage/SET_PROFILE_BACKGROUND`, photo } as const),
  changeMembersColumnOpenedStatus: (status: boolean) => ({ type: `/sn/profilePage/CHANGE_MEMBERS_COLUMN_OPENED_STATUS`, status } as const)
}

/* Thunks! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionTypes>

export const setUserPhotoThunk = (photo: File): ThunkType => async (dispatch) => {
  try {
    const res = await OptionsAPI.setUserPhoto(photo)
    if (res.resultCode === resultCode.Success) {
      dispatch(actions.setUserPhoto(res.data.photos.large))
    } else {
      const message = res.messages[0]
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
    return data
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const saveProfile = (profile: saveProfileType): ThunkType => async (dispatch, getState) => {
  try {
    const profileState = getState().profilePage.profile
    const userId = getState().auth.userId
    const profileStatus = profileState.status
    const aboutMe = profileState.aboutMe
    const userProfilePhoto = profileState.photos
    if (userId) {
      const trueProfile = {
        status: profileStatus,
        aboutMe: aboutMe,
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
        dispatch(setTextError(error))
      }
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const saveAboutMe = (aboutMe: string | null): ThunkType => async (dispatch, getState) => {
  try {
    const profileState = getState().profilePage.profile
    const userId = getState().auth.userId
    const profileStatus = profileState.status
    const userProfilePhoto = profileState.photos
    const contacts = profileState.contacts
    const userName = profileState.fullName
    if (userId) {
      const trueProfile = {
        status: profileStatus,
        aboutMe: aboutMe,
        userId: userId,
        lookingForAJob: true,
        lookingForAJobDescription: 'I\'m developer that has some skills: JavaScript, React.Js, TypeScript, Redux, C#, HTML, CSS, BootsTrap, SCSS and many others!',
        fullName: userName,
        contacts: contacts,
        photos: userProfilePhoto
      }
      const data = await ProfileAPI.saveProfile(trueProfile)
      if (data.resultCode === resultCode.Success) {
        dispatch(setUserProfileThunk(userId))
      } else {
        const error = data.messages[0]
        dispatch(setTextError(error))
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