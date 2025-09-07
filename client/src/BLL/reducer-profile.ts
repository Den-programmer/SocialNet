import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { postType, profileType, profileNavItem, ChangePhotosMenuItemType } from '../types/ProfileTypes/profileTypes'
import { profileApi } from '../DAL/profileApi'
import { PostChangingType } from '../types/ProfileTypes/profileTypes'

interface ProfileState {
  posts: postType[]
  username: string
  postNotification: Array<{ id: number; name: string }>
  profile: profileType
  profileNavigationMenu: profileNavItem[]
  changePhotosMenu: ChangePhotosMenuItemType[]
  changePhotosMenuItemId: number
  followed: boolean
  background: string
  gender: string
  isAddPostModalOpen: boolean
  isPostModalOpen: boolean
  isMembersColumnOpen: boolean
}

const initialState: ProfileState = {
  posts: [],
  username: 'Your nickname',
  postNotification: [
    { id: 1, name: 'Delete Post' },
    { id: 2, name: 'Edit Post' }
  ],
  profile: {
    status: '',
    aboutMe: '',
    contacts: {
      facebook: '',
      website: '',
      vk: '',
      twitter: '',
      instagram: '',
      youtube: '',
      github: '',
      mainLink: ''
    },
    photos: { large: '', small: '' },
    userId: '0'
  },
  profileNavigationMenu: [
    { id: 7012, title: 'Wall', isChosen: false, path: '/Wall' },
    { id: 7001, title: 'Profile', isChosen: true, path: '/Profile' },
    { id: 7013, title: 'Notifications', isChosen: false, path: '/Notifications' },
    { id: 7002, title: 'Messages', isChosen: false, path: '/Messages' },
    { id: 7006, title: 'Friends', isChosen: false, path: '/Friends/DataFriends' },
    { id: 7014, title: 'Following', isChosen: false, path: '/' }
  ],
  changePhotosMenu: [
    { id: 1, title: 'Change profile photo', isActive: true },
    { id: 2, title: 'Delete profile photo', isActive: false },
    { id: 3, title: 'Change background photo', isActive: false }
  ],
  changePhotosMenuItemId: 1,
  followed: false,
  background: '',
  gender: 'Not Chosen',
  isAddPostModalOpen: false,
  isPostModalOpen: false,
  isMembersColumnOpen: true
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeProfileNavItemChosenStatus(state, { payload }: PayloadAction<number>) {
      state.profileNavigationMenu = state.profileNavigationMenu.map(item => ({
        ...item, isChosen: item.id === payload
      }))
    },
    choosePhotosMenuItem(state, { payload }: PayloadAction<number>) {
      state.changePhotosMenu = state.changePhotosMenu.map(item => ({
        ...item, isActive: item.id === payload
      }))
      state.changePhotosMenuItemId = payload
    },
    setIsAddPostModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.isAddPostModalOpen = payload
    },
    setIsPostModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.isPostModalOpen = payload
    },
    changeMembersColumnOpenedStatus(state, { payload }: PayloadAction<boolean>) {
      state.isMembersColumnOpen = payload
    },
    setIsPostTitleEdited(state, { payload }: PayloadAction<{ postId: number; status: boolean }>) {
      state.posts = state.posts.map(post => post.id === payload.postId ? { ...post, isEditTitle: payload.status } : { ...post, isEditTitle: false })
    },
    setIsPostInfEdited(state, { payload }: PayloadAction<{ postId: number; status: boolean }>) {
      state.posts = state.posts.map(post => post.id === payload.postId ? { ...post, isEditPostInf: payload.status } : { ...post, isEditPostInf: false })
    },
    finishEditing(state) {
      state.posts = state.posts.map(post => ({ ...post, isEditTitle: false, isEditPostInf: false }))
    },
    onPostTitleChange(state, { payload }: PayloadAction<PostChangingType>) {
      state.posts = state.posts.map(post => post.id === payload.postId ? { ...post, postTitle: payload.postContent } : post)
    },
    onPostInfChange(state, { payload }: PayloadAction<PostChangingType>) {
      state.posts = state.posts.map(post => post.id === payload.postId ? { ...post, postInf: payload.postContent } : post)
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      profileApi.endpoints.getUsersProfile.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload
      }
    )
    builder.addMatcher(
      profileApi.endpoints.getUserBackground.matchFulfilled,
      (state, { payload }) => {
        state.background = payload
      }
    )
    builder.addMatcher(
      profileApi.endpoints.getUsername.matchFulfilled,
      (state, { payload }) => {
        state.username = payload
      }
    )
    builder.addMatcher(
      profileApi.endpoints.getUsersPosts.matchFulfilled,
      (state, { payload }) => {
        state.posts = payload
      }
    )
    builder.addMatcher(
      profileApi.endpoints.updateUsername.matchFulfilled,
      (state, { meta }) => {
        state.username = meta.arg.originalArgs.username
      }
    )
    builder.addMatcher(
      profileApi.endpoints.createPost.matchFulfilled,
      (state, { payload }) => {
        state.posts.push(payload)
      }
    )
    builder.addMatcher(
      profileApi.endpoints.updateContacts.matchFulfilled,
      (state, { meta }) => {
        state.profile.contacts = meta.arg.originalArgs.contacts
      }
    )
    builder.addMatcher(
      profileApi.endpoints.updateAboutMe.matchFulfilled,
      (state, { meta }) => {
        state.profile.aboutMe = meta.arg.originalArgs.aboutMe
      }
    )
    builder.addMatcher(
      profileApi.endpoints.getGender.matchFulfilled,
      (state, { payload }) => {
        state.gender = payload
      }
    )
    builder.addMatcher(
      profileApi.endpoints.updateGender.matchFulfilled,
      (state, { meta }) => {
        state.gender = meta.arg.originalArgs.gender
      }
    ),
    builder.addMatcher(
      profileApi.endpoints.setUserPhoto.matchFulfilled,
      (state, { payload }) => {
        state.profile.photos.large = payload.photos.large ?? ''
      }
    )
    builder.addMatcher(
      profileApi.endpoints.setUserBackground.matchFulfilled,
      (state, { payload }) => {
        state.background = payload
      }
    )
  }
})

export const profileActions = profileSlice.actions
export default profileSlice.reducer
