import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostType, profileType, profileNavItem, ChangePhotosMenuItemType } from '../types/ProfileTypes/profileTypes'
import { profileApi } from '../DAL/profileApi'

interface PostEditState {
  isEditing: boolean
  draftTitle: string
  draftInf: string
}

interface ProfileState {
  posts: PostType[]
  totalPostsCount: number
  editingPostId: string | null
  edits: Record<string, PostEditState>
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
  totalPostsCount: 0,
  editingPostId: null,
  edits: {},
  username: 'Your nickname',
  postNotification: [
    { id: 1, name: 'Delete Post' },
    { id: 2, name: 'Edit Post' }
  ],
  profile: {
    status: '',
    aboutMe: '',
    contacts: {
      facebook: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      linkedin: null,
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
        ...item,
        isChosen: item.id === payload
      }))
    },

    choosePhotosMenuItem(state, { payload }: PayloadAction<number>) {
      state.changePhotosMenu = state.changePhotosMenu.map(item => ({
        ...item,
        isActive: item.id === payload
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

    setPostsCount(state, { payload }: PayloadAction<number>) {
      state.totalPostsCount = payload
    },

    startEdit(state, { payload: postId }: PayloadAction<string>) {
      const post = state.posts.find(p => p._id === postId || p.id === postId)
      if (!post) return

      state.editingPostId = postId

      state.edits[postId] = {
        isEditing: true,
        draftTitle: post.postTitle,
        draftInf: post.postInf
      }
    },

    updateDraft(
      state,
      { payload }: PayloadAction<{ postId: string; field: 'title' | 'inf'; value: string }>
    ) {
      const edit = state.edits[payload.postId]
      if (!edit) return

      if (payload.field === 'title') {
        edit.draftTitle = payload.value
      } else {
        edit.draftInf = payload.value
      }
    },

    finishEdit(state, { payload }: PayloadAction<string | undefined>) {
      const postId = payload ?? state.editingPostId
      if (!postId) return

      state.editingPostId = null
      delete state.edits[postId]
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
      profileApi.endpoints.getUsername.matchFulfilled,
      (state, { payload }) => {
        state.username = payload
      }
    )

    builder.addMatcher(
      profileApi.endpoints.updateUsername.matchFulfilled,
      (state, { meta }) => {
        state.username = meta.arg.originalArgs.username
      }
    )

    builder.addMatcher(
      profileApi.endpoints.updateContacts.matchFulfilled,
      (state, { meta }) => {
        state.profile.contacts = meta.arg.originalArgs.contacts
      }
    )

    builder.addMatcher(
      profileApi.endpoints.setUserPhoto.matchFulfilled,
      (state, { payload }) => {
        state.profile.photos.large = payload.photos.large ?? ''
      }
    )
  }
})

export const profileActions = profileSlice.actions
export default profileSlice.reducer
