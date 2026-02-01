import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../DAL/authApi'

export type AuthState = {
  userId: string
  email: string | null
  login: string | null
  rememberMe: boolean
  isAuth: boolean
  token: string | null
  captchaUrl: string | null
  lastUrl: string
  isRegister: boolean
}

const userData = localStorage.getItem('userData')
const standartUserId = userData ? JSON.parse(userData).userId : '0'
const savedRememberMe = localStorage.getItem('rememberMe') === 'true'

const initialState: AuthState = {
  userId: standartUserId,
  email: null,
  login: null,
  rememberMe: savedRememberMe,
  isAuth: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') || null,
  captchaUrl: null,
  lastUrl: '',
  isRegister: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLastUrl(state, action: PayloadAction<string>) {
      state.lastUrl = action.payload
    },
    setIsRegisterStatus(state, action: PayloadAction<boolean>) {
      state.isRegister = action.payload
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.isRegister = true
        state.userId = payload.userId
        state.login = payload.userId
        state.email = payload.userId
        state.isAuth = true
        state.token = payload.token

        localStorage.setItem('userData', JSON.stringify({
          userId: payload.userId
        }))
        localStorage.setItem('token', payload.token ?? '')
      }
    )

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload, meta }) => {
        const rememberMe = (meta.arg.originalArgs as any)?.rememberMe ?? false
        
        state.userId = payload.userId
        state.login = payload.userId
        state.email = payload.userId
        state.isAuth = true
        state.rememberMe = rememberMe
        state.token = payload.token

        localStorage.setItem('userData', JSON.stringify({
          userId: payload.userId
        }))
        localStorage.setItem('token', payload.token ?? '')
        localStorage.setItem('rememberMe', rememberMe.toString())
      }
    )

    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.userId = '0'
        state.email = null
        state.login = null
        state.rememberMe = false
        state.isAuth = false
        state.token = null
        state.captchaUrl = null
        state.lastUrl = ''
        state.isRegister = false

        localStorage.removeItem('userData')
        localStorage.removeItem('token')
      }
    )
  }
})

export const authActions = authSlice.actions
export default authSlice.reducer