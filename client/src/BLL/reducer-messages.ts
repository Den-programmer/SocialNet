import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'
import { messagesApi as graphqlMessagesApi } from '../DAL/graphQL/graphqlApi'

type MessagesState = {
  dialogs: userDialogType[]
  messages: message[]
  userDialogId: string
  trim: string
  isUserProfileMenuOpen: boolean
  isMessagesLoading: boolean
}

const initialState: MessagesState = {
  dialogs: [],
  messages: [],
  userDialogId: '',
  trim: '',
  isUserProfileMenuOpen: false,
  isMessagesLoading: false
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setUserDialogId(state, action: PayloadAction<string>) {
      state.userDialogId = action.payload
      state.dialogs = state.dialogs.map(d => ({
        ...d,
        isActive: d.id === action.payload
      }))
    },
    setUserProfileMenuStatus(state, action: PayloadAction<boolean>) {
      state.isUserProfileMenuOpen = action.payload
    },
    setMessagesTrim(state, action: PayloadAction<string>) {
      state.trim = action.payload
    },
    setIsMessagesLoading(state, action: PayloadAction<boolean>) {
      state.isMessagesLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      graphqlMessagesApi.endpoints.getAllDialogs.matchFulfilled,
      (state, { payload }) => {
        if (!Array.isArray(payload) || payload.length === 0) return
        const firstDialog = payload[0]
        // Auto-select first dialog only if nothing is selected yet
        if (!state.userDialogId) {
          state.userDialogId = firstDialog.id || ''
        }
        state.dialogs = payload.map((d, i: number) => ({
          ...d,
          isActive: i === 0 && !state.userDialogId
        }))
      }
    )
    builder.addMatcher(
      graphqlMessagesApi.endpoints.startDialog.matchFulfilled,
      (state, { payload }) => {
        if (!payload) return
        const dialog = payload
        state.dialogs.push({ ...dialog, isActive: false })
        // Switch to the newly created dialog
        state.userDialogId = dialog.id || state.userDialogId
      }
    )
    builder.addMatcher(
      graphqlMessagesApi.endpoints.deleteDialog.matchFulfilled,
      (state, action) => {
        const dialogId = (action.meta?.arg?.originalArgs as { dialogId: string })?.dialogId
        if (!dialogId) return
        state.dialogs = state.dialogs.filter((d) => d.id !== dialogId)
        if (state.userDialogId === dialogId) {
          const firstDialog = state.dialogs[0]
          state.userDialogId = firstDialog ? (firstDialog.id || '') : ''
        }
      }
    )
  }
})

export const {
  setUserDialogId,
  setUserProfileMenuStatus,
  setMessagesTrim,
  setIsMessagesLoading
} = messagesSlice.actions

export const messagesActions = messagesSlice.actions
export default messagesSlice.reducer