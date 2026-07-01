import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../DAL/authApi'

const TOKEN_STORAGE_KEY = 'authToken'
const REMEMBER_ME_STORAGE_KEY = 'rememberMe'

const readStorage = (key: string) => {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem(key)
}

const writeStorage = (key: string, value: string) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(key, value)
}

const removeStorage = (key: string) => {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(key)
}

const storedToken = readStorage(TOKEN_STORAGE_KEY)
const storedRememberMe = readStorage(REMEMBER_ME_STORAGE_KEY) === 'true'

let accessToken: string | null = storedToken

export const setToken = (token: string, rememberMe = false) => {
  accessToken = token

  if (rememberMe && token) {
    writeStorage(TOKEN_STORAGE_KEY, token)
    return
  }

  removeStorage(TOKEN_STORAGE_KEY)
}

export const getToken = () => accessToken

export const clearToken = () => {
  accessToken = null
  removeStorage(TOKEN_STORAGE_KEY)
}

export type AuthState = {
  userId: string
  email: string | null
  rememberMe: boolean
  isAuth: boolean
  captchaUrl: string | null
  lastUrl: string
  isRegister: boolean
}

const userData = readStorage('userData')
const standartUserId = userData ? JSON.parse(userData).userId : '0'
const initialState: AuthState = {
  userId: standartUserId,
  email: null,
  rememberMe: storedRememberMe,
  isAuth: !!getToken(),
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
      (state, { payload, meta }) => {
        const rememberMe = (meta.arg.originalArgs as { rememberMe?: boolean })?.rememberMe ?? false

        state.isRegister = true
        state.userId = payload.userId
        state.email = payload.userId
        state.isAuth = true
        state.rememberMe = rememberMe

        writeStorage('userData', JSON.stringify({
          userId: payload.userId
        }))
        writeStorage(REMEMBER_ME_STORAGE_KEY, rememberMe.toString())
        setToken(payload.token || '', rememberMe)
      }
    )

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload, meta }) => {
        const rememberMe = (meta.arg.originalArgs as { rememberMe?: boolean })?.rememberMe ?? false
        
        state.userId = payload.userId
        state.email = payload.userId
        state.isAuth = true
        state.rememberMe = rememberMe

        writeStorage('userData', JSON.stringify({
          userId: payload.userId
        }))
        writeStorage(REMEMBER_ME_STORAGE_KEY, rememberMe.toString())
        setToken(payload.token || '', rememberMe)
      }
    )

    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.userId = '0'
        state.email = null
        state.rememberMe = false
        state.isAuth = false
        state.captchaUrl = null
        state.lastUrl = ''
        state.isRegister = false

        removeStorage('userData')
        removeStorage(REMEMBER_ME_STORAGE_KEY)

        clearToken()
      }
    )
  }
})

export const authActions = authSlice.actions
export default authSlice.reducer
