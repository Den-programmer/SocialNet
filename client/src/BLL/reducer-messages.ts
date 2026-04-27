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
        isActive: (d as any).id === action.payload || d._id === action.payload
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
        const firstDialog = payload[0] as any
        // Auto-select first dialog only if nothing is selected yet
        if (!state.userDialogId) {
          state.userDialogId = firstDialog.id || firstDialog._id || ''
        }
        state.dialogs = (payload as any[]).map((d: any, i: number) => ({
          ...d,
          isActive: i === 0 && !state.userDialogId
        }))
      }
    )
    builder.addMatcher(
      graphqlMessagesApi.endpoints.startDialog.matchFulfilled,
      (state, { payload }) => {
        if (!payload) return
        const dialog = payload as any
        state.dialogs.push({ ...dialog, isActive: false })
        // Switch to the newly created dialog
        state.userDialogId = dialog.id || dialog._id || state.userDialogId
      }
    )
    builder.addMatcher(
      graphqlMessagesApi.endpoints.deleteDialog.matchFulfilled,
      (state, action) => {
        const dialogId = (action.meta?.arg?.originalArgs as any)?.dialogId
        if (!dialogId) return
        state.dialogs = state.dialogs.filter((d: any) => (d.id || d._id) !== dialogId)
        if (state.userDialogId === dialogId) {
          const firstDialog = state.dialogs[0] as any
          state.userDialogId = firstDialog ? (firstDialog.id || firstDialog._id || '') : ''
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