import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './redux'
import { profileApi } from '../DAL/profileApi'

type AppState = {
  isInitialized: boolean
  messageError: string
  isModalOpen: boolean
  date: string
  isSmthLoading: boolean
  headerHeight: string
}

const initialState: AppState = {
  isInitialized: false,
  messageError: '',
  isModalOpen: false,
  date: '',
  isSmthLoading: false,
  headerHeight: '64px'
}

export const initialize = createAsyncThunk('app/initialize', async (_, { dispatch, getState }) => {
  try {
    const raw = localStorage.getItem('userData')
    const { userId } = JSON.parse(raw || "")
    const existingUserId = userId || (getState() as RootState).auth.userId

    await dispatch(profileApi.endpoints.getUsersProfile.initiate(existingUserId)).unwrap()
    await dispatch(profileApi.endpoints.getUsername.initiate(existingUserId)).unwrap()
    await dispatch(profileApi.endpoints.getGender.initiate(existingUserId)).unwrap()

    const date = new Date()
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    dispatch(appActions.setCurrentDate(formattedDate))
    dispatch(appActions.setInitialized())
  } catch (e) {
    console.error('Initialization error:', e)
  }
})

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized(state) {
      state.isInitialized = true
    },
    setTextError(state, action: PayloadAction<string>) {
      state.messageError = action.payload
    },
    setIsModalOpenStatus(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload
    },
    setCurrentDate(state, action: PayloadAction<string>) {
      state.date = action.payload
    },
    setIsSmthLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isSmthLoading = action.payload
    },
    setHeaderHeight(state, action: PayloadAction<string>) {
      state.headerHeight = action.payload
    }
  }
})

export const _getDate = (state: RootState) => state.app.date

// Actions & Reducer
export const {
  setInitialized,
  setTextError,
  setIsModalOpenStatus,
  setCurrentDate,
  setIsSmthLoadingStatus,
  setHeaderHeight
} = appSlice.actions

export default appSlice.reducer
export const appActions = appSlice.actions