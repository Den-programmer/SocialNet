import { AuthAPI } from '../DAL/authApi'
import { SecurityAPI } from '../DAL/securityApi'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { RootState, InferActionTypes } from './redux'
import { resultCode, captchaCode } from '../DAL/api'
import { actions as actionsProfile } from './reducer-profile'



type authType = {
  userId: number
  email: string | null
  login: string | null
  password: string | null
  rememberMe: boolean
  isAuth: boolean
  token: string | null
  captchaUrl: string | null
  lastUrl: string,
  isRegister: boolean
}

const auth = {
  userId: 0,
  email: null,
  login: null,
  password: null,
  rememberMe: false,
  isAuth: false,
  token: null,
  captchaUrl: null,
  lastUrl: '',
  isRegister: false
} as authType

const reducerAuth = (state = auth, action: ActionTypes): authType => {
  switch (action.type) {
    case `sn/auth/SET_AUTH_USER_DATA`:
      const { userId, email, login, password, rememberMe, isAuth, token } = action.data
      return {
        ...state,
        userId,
        email,
        login,
        password,
        rememberMe,
        isAuth, 
        token
      }
    case `sn/auth/SET_CAPTCHA_URL`:
      return {
        ...state,
        captchaUrl: action.captcha
      }
    case `sn/auth/SET_LAST_URL`:
      return {
        ...state,
        lastUrl: action.url
      }  
    case `sn/auth/SET_IS_REGISTER_STATUS`:
      return {
        ...state,
        isRegister: action.status
      }
    default:
      return state
  }
}

// Action Creators!

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
  setAuthUserData: (userId: number, email: string | null, login: string | null, password: string | null, isAuth: boolean, rememberMe: boolean, token: string | null) => ({ type: `sn/auth/SET_AUTH_USER_DATA`, data: { userId, email, login, password, isAuth, rememberMe, token } } as const),
  setCaptchaUrl: (captcha: string) => ({ type: `sn/auth/SET_CAPTCHA_URL`, captcha } as const),
  setLastUrl: (url: string) => ({ type: `sn/auth/SET_LAST_URL`, url } as const),
  setIsRegisterStatus: (status: boolean) => ({ type: `sn/auth/SET_IS_REGISTER_STATUS`, status } as const)
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

// Thunk Creators!

// export const authentication = ():ThunkType => (dispatch) => {
//   return AuthAPI.auth().then((data) => {
//     if (data.resultCode === resultCode.Success) dispatch(actions.setAuthUserData(data.data.id, data.data.email, data.data.login, null, true, true))
//   })
// }
export const register = (email: string | null, 
  username: string | null, 
  password: string | null, 
  rememberMe = false as boolean, 
  captcha: string | null):ThunkType => async (dispatch) => {
    try {
      const response = await AuthAPI.register(email, username, password, rememberMe, captcha)
      if(response.resultCode === resultCode.Success) {
        dispatch(actions.setAuthUserData(response.data.userId, email, email, password, true, rememberMe, null))
        // @ts-ignore
        dispatch(actionsProfile.changeUserName(username))
      } else {
        if(response.resultCode === captchaCode.captchaIsRequired) {
          dispatch(getCaptchaUrl())
        }
        const messageError = response.message
        const action: any = stopSubmit("login", { _error: messageError })
        dispatch(action)
      }
    } catch(e) {

    }
}
export const login = (email: string | null, password: string | null, rememberMe = false as boolean, captcha: string | null):ThunkType => async (dispatch) => {
  try {
    debugger
    const response = await AuthAPI.login(email, password, rememberMe, captcha)
    debugger
    if (response.resultCode === resultCode.Success) {
      debugger
      dispatch(actions.setAuthUserData(response.data.userId, email, email, password, true, rememberMe, response.data.token))
      debugger
      localStorage.setItem('userData', JSON.stringify({
        userId: response.data.userId,
        email, 
        password,
        rememberMe,
        captcha, 
        token: response.data.token
      }))
    } else {
      debugger
      if (response.resultCode === captchaCode.captchaIsRequired) {
        dispatch(getCaptchaUrl())
      }
      const messageError = response.message
      const action: any = stopSubmit("login", { _error: messageError })
      dispatch(action)
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const logout = ():ThunkType => async (dispatch) => {
  try {
    await AuthAPI.logout()
    dispatch(actions.setAuthUserData(0, null, null, null, false, false, null))
    localStorage.removeItem('userData')
  } catch (error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  try {
    const data = await SecurityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.setCaptchaUrl(captchaUrl))
  } catch(error) {
    alert(`Something's gone wrong, error status: 500`)
  }
}

export default reducerAuth