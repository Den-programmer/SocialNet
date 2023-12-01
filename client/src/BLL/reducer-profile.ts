import defaultUser from './../components/Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'
import { ProfileAPI } from '../DAL/profileApi'
import { OptionsAPI } from "../DAL/optionsApi"
import { resultCode } from '../DAL/api'
import { setTextError, setTextErrorActionType } from './reducer-app'
import { RootState, InferActionTypes } from './redux'
import { ThunkAction } from 'redux-thunk'
import beautifulLight from '../components/Article/Profile/User/images/profileBackground.jpg'
import { postType, postNotificationType, profileNavItem, ChangePhotosMenuItemType, profileType, saveProfileType } from '../types/ProfileTypes/profileTypes'
import { formatDate } from '../utils/helpers/functions/function-helpers'

const entity = 'sn/profilePage/'

const profilePage = {
  posts: [] as Array<postType>,
  username: "Your nickname",
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
    status: "",
    aboutMe: "",
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
    case `/sn/profilePage/SET_POSTS`:
      return {
        ...state,
        posts: action.posts
      }
    case `/sn/profilePage/ADD-POST`:
      return {
        ...state,
        posts: [...state.posts as Array<postType>, action.newPost as postType]
      }
    case `/sn/profilePage/DELETE_POST`:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }
    case `/sn/profilePage/SET_PROFILE_USER_ID`:
      return {
        ...state,
        profile: { ...state.profile, userId: action.userId }
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
        username: action.userName
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
          if (action.itemId === item.id) return { ...item, isActive: true }
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
    case `/sn/profilePage/SET_IS_POST_TITLE_EDITED`:
      return {
        ...state,
        posts: state.posts.map((post: postType) => {
          if (post.id === action.postId) return { ...post, isEditTitle: action.status }
          return { ...post, isEditTitle: false }
        })
      }
    case `/sn/profilePage/SET_IS_POST_INF_EDITED`:
      return {
        ...state,
        posts: state.posts.map((post: postType) => {
          if (post.id === action.postId) return { ...post, isEditPostInf: action.status }
          return { ...post, isEditPostInf: false }
        })
      }
    case `/sn/profilePage/FINISH_EDITING`:
      return {
        ...state,
        posts: state.posts.map((post: postType) => ({ ...post, isEditTitle: false, isEditPostInf: false }))
      }
    case `/sn/profilePage/POST_TITLE_CHANGE`:
      return {
        ...state,
        posts: state.posts.map((post: postType) => {
          if (post.id === action.postId) return ({ ...post, postTitle: action.postTitle })
          return post
        })
      }
    case `/sn/profilePage/POST_TITLE_INF`:
      return {
        ...state,
        posts: state.posts.map((post: postType) => {
          if (post.id === action.postId) return ({ ...post, postInf: action.postInf })
          return post
        })
      }
    default:
      return state
  }
}

/* Action Creators! */

type ActionTypes = InferActionTypes<typeof actions> | setTextErrorActionType

export const actions = {
  setPosts: (posts: Array<postType>) => ({ type: `/sn/profilePage/SET_POSTS`, posts } as const),
  addPost: (newPost: postType) => ({ type: `/sn/profilePage/ADD-POST`, newPost } as const),
  deletePost: (postId: number) => ({ type: `/sn/profilePage/DELETE_POST`, postId } as const),
  setProfileUserId: (userId: number) => ({ type: `/sn/profilePage/SET_PROFILE_USER_ID`, userId } as const),
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
  changeMembersColumnOpenedStatus: (status: boolean) => ({ type: `/sn/profilePage/CHANGE_MEMBERS_COLUMN_OPENED_STATUS`, status } as const),
  setIsPostTitleEdited: (postId: number, status: boolean) => ({ type: `/sn/profilePage/SET_IS_POST_TITLE_EDITED`, postId, status } as const),
  setIsPostInfEdited: (postId: number, status: boolean) => ({ type: `/sn/profilePage/SET_IS_POST_INF_EDITED`, postId, status } as const),
  finishEditing: () => ({ type: `/sn/profilePage/FINISH_EDITING` } as const),
  onPostTitleChange: (postId: number, postTitle: string) => ({ type: `/sn/profilePage/POST_TITLE_CHANGE`, postId, postTitle } as const),
  onPostInfChange: (postId: number, postInf: string) => ({ type: `/sn/profilePage/POST_TITLE_INF`, postId, postInf } as const)
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
    const res = await ProfileAPI.getUsersProfile(userId)
    const currProfile = { ...res.data.profile, userId }
    dispatch(actions.setUserProfile(currProfile))
    return currProfile
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
        contacts: profile.contacts,
        photos: userProfilePhoto
      }
      const res = await ProfileAPI.saveProfile(trueProfile)
      if (res.resultCode === resultCode.Success) {
        dispatch(setUserProfileThunk(userId))
      } else {
        dispatch(setTextError(res.message))
      }
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const saveAboutMe = (aboutMe: string): ThunkType => async (dispatch, getState) => {
  try {
    const profileState = getState().profilePage.profile
    const userId = getState().auth.userId
    const profileStatus = profileState.status
    const userProfilePhoto = profileState.photos
    const contacts = profileState.contacts
    if (userId) {
      const trueProfile = {
        status: profileStatus,
        aboutMe: aboutMe,
        userId: userId,
        contacts: contacts,
        photos: userProfilePhoto
      }
      const data = await ProfileAPI.saveProfile(trueProfile)
      if (data.resultCode === resultCode.Success) {
        dispatch(setUserProfileThunk(userId))
      } else {
        dispatch(setTextError(data.message))
      }
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const setStatusThunk = (userId: number): ThunkType => async (dispatch) => {
  // try {
  //   const data = await ProfileAPI.getStatus(userId)
  //   dispatch(actions.setStatus(data))
  // } catch (error) {
  //   console.log(error)
  //   alert(`Something's gone wrong, error status: 500`)
  // }
}
export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
  // try {
  //   const data = await ProfileAPI.updateStatus(status)
  //   dispatch(actions.updateStatus(data))
  // } catch (error) {
  //   alert(`Something's gone wrong, error status: 500`)
  // }
}
export const getIsUserFollowed = (userId: number): ThunkType => async (dispatch) => {
  // try {
  //   const res = await ProfileAPI.getIsUserFollowed(userId)
  //   dispatch(actions.setIsUserFollowed(res.data))
  // } catch (e) {
  //   alert(`Something's gone wrong, error status: 500`)
  // }
}

export const requestGender = (userId: number): ThunkType => async (dispatch) => {
  try {
    const res = await ProfileAPI.getGender(userId)
    dispatch(actions.changeGender(res.data.gender))
  } catch (e) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const setGender = (gender: string, userId: number): ThunkType => async (dispatch) => {
  try {
    const resGender = await ProfileAPI.updateGender(gender, userId)
    dispatch(actions.changeGender(resGender))
  } catch (e) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const requestUsername = (userId: number): ThunkType => async (dispatch) => {
  try {
    const res = await ProfileAPI.getUsername(userId)
    if (res.resultCode === resultCode.Success) {
      dispatch(actions.changeUserName(res.data.username))
    } else {
      // проверить надо!
      dispatch(setTextError(res.message))
    }
  } catch (e) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const setUsername = (userId: number, username: string): ThunkType => async (dispatch) => {
  try {
    const resUsername = await ProfileAPI.updateUsername(userId, username)
    dispatch(actions.changeUserName(resUsername))
  } catch (e) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export const requireUsersPosts = (userId: string): ThunkType => async (dispatch) => {
  try {
    const res = await ProfileAPI.getUsersPosts(userId)
    if (res.resultCode === resultCode.Success) {
      const posts = await Promise.all(res.data.posts.map(async (post: postType) => {
        try {
          let imageUrl

          if (typeof post.postImg === 'string') {
            imageUrl = post.postImg
          } else if (post.postImg instanceof File) {
            imageUrl = URL.createObjectURL(post.postImg)
          } else if (isBinaryData(post.postImg)) {
            // @ts-ignore
            const byteArray = Uint8Array.from(post.postImg.data)
            // @ts-ignore
            const blob = new Blob([byteArray], { type: post.postImg.contentType })
            imageUrl = URL.createObjectURL(blob)
          } else {
            console.error("Unsupported postImg type:", post.postImg)
            return post
          }

          const createdAtString = formatDate(post.createdAt)

          return { ...post, postImg: imageUrl, createdAt: createdAtString }
        } catch (error) {
          console.error("Error creating object URL:", error)
          return post
        }
      }))

      dispatch(actions.setPosts(posts))

      posts.forEach(post => {
        if (typeof post.postImg !== 'string' && post.postImg instanceof Blob) {
          URL.revokeObjectURL(post.postImg);
        }
      })
    } else {
      alert(`Something's gone wrong, error status: 500`);
    }
  } catch (e) {
    alert(`Something's gone wrong, error status: 500`);
  }
}

function isBinaryData(obj: any) {
  return (
    obj &&
    typeof obj === 'object' &&
    obj.hasOwnProperty('data') &&
    Array.isArray(obj.data) &&
    obj.hasOwnProperty('contentType')
  )
}

export const createPost = (userId: string, newPostTitle: string, newPostInformat: string, postPhoto: File): ThunkType => async (dispatch) => {
  try {
    const res = await ProfileAPI.createPost(userId, newPostTitle, newPostInformat, postPhoto)
    if (res.resultCode === resultCode.Success) {
      const imageData = res.data.newPost.postImg.data.data
      const uint8Array = new Uint8Array(imageData)
      const blob = new Blob([uint8Array], { type: res.data.newPost.postImg.contentType })
      const imageUrl = URL.createObjectURL(blob)

      const createdAtString = formatDate(res.data.newPost.createdAt)

      dispatch(actions.addPost({ ...res.data.newPost, postImg: imageUrl, createdAt: createdAtString }))
    } else {
      console.error("ResultCode is ", res.resultCode)
      alert(`Something's gone wrong, error status: 500`)
    }
  } catch (e) {
    console.error(e)
    alert(`Something's gone wrong, error status: 500`)
  }
}

export default reducerProfile