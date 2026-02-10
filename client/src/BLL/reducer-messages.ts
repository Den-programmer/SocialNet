import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'
import { messagesApi } from '../DAL/messagesApi'

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
  userDialogId: '0',
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
        isActive: d._id === action.payload
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
      messagesApi.endpoints.getAllDialogs.matchFulfilled,
      (state, { payload }) => {
        const dialogsWithActive = payload.map((d, i) => ({
          ...d,
          isActive: i === 0
        }))
        state.dialogs = dialogsWithActive
        state.userDialogId = dialogsWithActive[0]?._id || '0'
      }
    )
    builder.addMatcher(
      messagesApi.endpoints.startDialog.matchFulfilled,
      (state, { payload }) => {
        state.dialogs.push({ ...payload, isActive: false })
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