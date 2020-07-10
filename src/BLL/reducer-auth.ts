import { AuthAPI } from '../DAL/api'
import { SecurityAPI } from '../DAL/api'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './redux'
import { resultCode, captchaCode } from '../DAL/api'

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

type authType = {
  userId: number | null
  email: string | null
  login: string | null
  password: string | null
  rememberMe: boolean
  isAuth: boolean
  captchaUrl: string | null
}

let auth = {
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
    case SET_AUTH_USER_DATA:
      let { userId, email, login, password, rememberMe, isAuth } = action.data;
      return {
        ...state,
        userId,
        email,
        login,
        password,
        rememberMe,
        isAuth
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captcha
      }
    default:
      return state;
  }
}

// Action Creators!

type ActionTypes = setAuthUserDataActionType | setCaptchaUrlActionType

type setAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA
  data: {
    userId: number | null
    email: string | null
    login: string | null
    password: string | null
    isAuth: boolean
    rememberMe: boolean
  }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, password: string | null, isAuth: boolean, rememberMe: boolean):setAuthUserDataActionType => {
  return { type: SET_AUTH_USER_DATA, data: { userId, email, login, password, isAuth, rememberMe } }
}

type setCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL
  captcha: string
}

export const setCaptchaUrl = (captcha: string):setCaptchaUrlActionType => {
  return { type: SET_CAPTCHA_URL, captcha }
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

// Thunk Creators!

type authenticationDataType = {
  resultCode: number
  data: {
    id: number
    email: string
    login: string
  }
}

export const authentication = ():ThunkType => (dispatch) => {
  return AuthAPI.auth().then((data: authenticationDataType) => {
    if (data.resultCode === resultCode.Success) dispatch(setAuthUserData(data.data.id, data.data.email, data.data.login, null, true, true));
  });
}
export const login = (email: string | null, password: string | null, rememberMe = false as boolean, captcha: string | null):ThunkType => async (dispatch) => {
  try {
    let response = await AuthAPI.login(email, password, rememberMe, captcha);
    let data = await AuthAPI.auth();
    if (response.resultCode === resultCode.Success) {
      dispatch(setAuthUserData(data.data.id, email, email, password, true, rememberMe));
    } else {
      if (response.resultCode === captchaCode.captchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let messageError = response.messages[0];
      let action: any = stopSubmit("login", { _error: messageError })
      dispatch(action);
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}
export const logout = ():ThunkType => async (dispatch) => {
  try {
    await AuthAPI.logout()
    dispatch(setAuthUserData(null, null, null, null, false, false));
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  try {
    let data = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrl(captchaUrl));
  } catch(error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}

export default reducerAuth;