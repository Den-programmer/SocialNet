import { AuthAPI } from '../DAL/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';

let auth = {
  userId: 7149,
  email: null,
  login: null,
  password: null,
  rememberMe: false,
  isAuth: false
}

const reducerAuth = (state = auth, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...action.data
      };
    default:
      return state;
  }
}

export const setAuthUserData = (userId, email, login, password, isAuth, rememberMe) => {
  return { type: SET_AUTH_USER_DATA, data: { userId, email, login, password, isAuth, rememberMe } }
}

export const authentication = () => (dispatch) => {
  return AuthAPI.auth().then(data => {
    if (data.resultcode === 0) {
      dispatch(setAuthUserData(data.data.id, data.email, data.login, null, true, true));
    }
  });
}
export const login = (email, password, rememberMe = false) => async (dispatch) => {
  let response = await AuthAPI.login(email, password, rememberMe);
  let data = await AuthAPI.auth();
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(data.data.id, email, email, password, true, rememberMe));
  } else {
    let messageError = response.messages[0];
    dispatch(stopSubmit("login", { _error: messageError }));
  }
}
export const logout = () => async (dispatch) => {
  await AuthAPI.logout()
  dispatch(setAuthUserData(null, null, null, null, false, false));
}

export default reducerAuth;