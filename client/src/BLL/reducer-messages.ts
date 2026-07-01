import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageType, userDialogType } from '../types/MessagesTypes/messagesTypes'
import { messagesApi } from '../DAL/messagesApi'

type MessagesState = {
  dialogs: userDialogType[]
  messages: MessageType[]
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

const syncSelectedDialogState = (state: MessagesState, dialogs: userDialogType[]) => {
  if (dialogs.length === 0) {
    state.dialogs = []
    state.messages = []
    state.userDialogId = ''
    return
  }

  const selectedDialogExists = state.userDialogId
    ? dialogs.some((dialog) => dialog.id === state.userDialogId)
    : false

  if (!selectedDialogExists) {
    state.userDialogId = dialogs[0].id || ''
  }

  const selectedDialog = dialogs.find((dialog) => dialog.id === state.userDialogId) || dialogs[0]
  const activeDialogId = selectedDialog?.id || ''

  state.dialogs = dialogs.map((dialog) => ({
    ...dialog,
    isActive: dialog.id === activeDialogId
  }))
  state.messages = selectedDialog?.messages || []
  state.userDialogId = activeDialogId
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
      state.messages = state.dialogs.find((dialog) => dialog.id === action.payload)?.messages || []
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
      messagesApi.endpoints.getAllDialogs.matchFulfilled,
      (state, { payload }) => {
        if (!Array.isArray(payload)) return
        syncSelectedDialogState(state, payload)
      }
    )
    builder.addMatcher(
      messagesApi.endpoints.startDialog.matchFulfilled,
      (state, { payload }) => {
        if (!payload) return

        const dialogIndex = state.dialogs.findIndex((dialog) => dialog.id === payload.id)
        if (dialogIndex === -1) {
          state.dialogs.push({ ...payload, isActive: true })
        } else {
          state.dialogs[dialogIndex] = { ...state.dialogs[dialogIndex], ...payload, isActive: true }
        }

        state.userDialogId = payload.id || state.userDialogId
        state.messages = payload.messages || []
        state.dialogs = state.dialogs.map((dialog) => ({
          ...dialog,
          isActive: dialog.id === state.userDialogId
        }))
      }
    )
    builder.addMatcher(
      messagesApi.endpoints.deleteDialog.matchFulfilled,
      (state, action) => {
        const dialogId = (action.meta?.arg?.originalArgs as { dialogId: string })?.dialogId
        if (!dialogId) return
        state.dialogs = state.dialogs.filter((d) => d.id !== dialogId)
        if (state.userDialogId === dialogId) {
          const firstDialog = state.dialogs[0]
          state.userDialogId = firstDialog ? (firstDialog.id || '') : ''
          state.messages = firstDialog?.messages || []
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
