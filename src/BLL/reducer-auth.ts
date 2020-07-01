import { AuthAPI } from '../DAL/api';
import { SecurityAPI } from '../DAL/api';
import { stopSubmit } from 'redux-form';

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

const reducerAuth = (state = auth, action: any): authType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...action.data
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

type setAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA
  data: {
    userId: number | null
    email: string | null
    login: string | null
    password: string | null
    isAuth: boolean | null
    rememberMe: boolean | null
  }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, password: string | null, isAuth: boolean | null, rememberMe: boolean | null):setAuthUserDataActionType => {
  return { type: SET_AUTH_USER_DATA, data: { userId, email, login, password, isAuth, rememberMe } }
}

type setCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL
  captcha: string
}

export const setCaptchaUrl = (captcha: string):setCaptchaUrlActionType => {
  return { type: SET_CAPTCHA_URL, captcha }
}

// Thunk Creators!

type authenticationDataType = {
  resultCode: number
  data: {
    id: number
    email: string
    login: string
  }
}

export const authentication = () => (dispatch: any) => {
  return AuthAPI.auth().then((data: authenticationDataType) => {
    if (data.resultCode === 0) {
      debugger
      dispatch(setAuthUserData(data.data.id, data.data.email, data.data.login, null, true, true));
    }
  });
}
export const login = (email: string | null, password: string | null, rememberMe = false as boolean | null, captcha: string | null) => async (dispatch: any) => {
  try {
    let response = await AuthAPI.login(email, password, rememberMe, captcha);
    let data = await AuthAPI.auth();
    if (response.resultCode === 0) {
      dispatch(setAuthUserData(data.data.id, email, email, password, true, rememberMe));
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      let messageError = response.messages[0];
      dispatch(stopSubmit("login", { _error: messageError }));
    }
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}
export const logout = () => async (dispatch: any) => {
  try {
    await AuthAPI.logout()
    dispatch(setAuthUserData(null, null, null, null, false, false));
  } catch (error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
  try {
    let data = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrl(captchaUrl));
  } catch(error) {
    alert(`Something's gone wrong, error status: ${error.status}`);
  }
}

export default reducerAuth;