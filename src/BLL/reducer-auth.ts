import { AuthAPI } from '../DAL/authApi'
import { SecurityAPI } from '../DAL/securityApi'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { RootState, InferActionTypes } from './redux'
import { resultCode, captchaCode } from '../DAL/api'



type authType = {
  userId: number | null
  email: string | null
  login: string | null
  password: string | null
  rememberMe: boolean
  isAuth: boolean
  captchaUrl: string | null
}

const auth = {
  userId: 7149,
  email: null,
  login: null,
  password: null,
  rememberMe: false,
  isAuth: false,
  captchaUrl: null
} as authType

const reducerAuth = (state = auth, action: ActionTypes): authType => {
  switch (action.type) {
    case `sn/auth/SET_AUTH_USER_DATA`:
      const { userId, email, login, password, rememberMe, isAuth } = action.data
      return {
        ...state,
        userId,
        email,
        login,
        password,
        rememberMe,
        isAuth
      };
    case `sn/auth/SET_CAPTCHA_URL`:
      return {
        ...state,
        captchaUrl: action.captcha
      }
    default:
      return state
  }
}

// Action Creators!

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, password: string | null, isAuth: boolean, rememberMe: boolean) => ({ type: `sn/auth/SET_AUTH_USER_DATA`, data: { userId, email, login, password, isAuth, rememberMe } } as const),
  setCaptchaUrl: (captcha: string) => ({ type: `sn/auth/SET_CAPTCHA_URL`, captcha } as const)
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

// Thunk Creators!

export const authentication = ():ThunkType => (dispatch) => {
  return AuthAPI.auth().then((data) => {
    if (data.resultCode === resultCode.Success) dispatch(actions.setAuthUserData(data.data.id, data.data.email, data.data.login, null, true, true))
  })
}
export const login = (email: string | null, password: string | null, rememberMe = false as boolean, captcha: string | null):ThunkType => async (dispatch) => {
  try {
    const response = await AuthAPI.login(email, password, rememberMe, captcha)
    const data = await AuthAPI.auth()
    if (response.resultCode === resultCode.Success) {
      dispatch(actions.setAuthUserData(data.data.id, email, email, password, true, rememberMe))
    } else {
      if (response.resultCode === captchaCode.captchaIsRequired) {
        dispatch(getCaptchaUrl())
      }
      const messageError = response.messages[0]
      const action: any = stopSubmit("login", { _error: messageError })
      dispatch(action)
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`)
  }
}
export const logout = ():ThunkType => async (dispatch) => {
  try {
    await AuthAPI.logout()
    dispatch(actions.setAuthUserData(null, null, null, null, false, false))
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`)
  }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  try {
    let data = await SecurityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.setCaptchaUrl(captchaUrl))
  } catch(error) {
    alert(`Something's gone wrong, error status: ${error.status}`)
  }
}

export default reducerAuth