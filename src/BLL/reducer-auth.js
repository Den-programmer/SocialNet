import { AuthAPI } from '../DAL/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let auth = {
    userId: null,
    email: null,
    login: null,
    password: null,
    rememberMe: false,
    isAuth: false
}

const reducerAuth = (state = auth, action) => {
  let stateCopy = { ...state }
  stateCopy.userInf = {...state.userInf} 

  switch (action.type) {
    case SET_AUTH_USER_DATA:
      stateCopy = action.data;

      return stateCopy;
    default:
      return state;
  }
}

export const setAuthUserData = (userId, email, login, password, isAuth, rememberMe = false) => {
  return { type: SET_AUTH_USER_DATA, data: { userId, email, login, password, isAuth, rememberMe } }
}

export const authentication = () => {
  return (dispatch) => {
    AuthAPI.auth().then(data => {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, data.resultCode));
    });
  }
}
export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    AuthAPI.login(email, password, rememberMe).then(response => {
      AuthAPI.auth().then(data => {
        dispatch(setAuthUserData(response.userId, email, email, password, 0, rememberMe));
      });
    });
  }
}
export const logout = () => {
  return (dispatch) => {
    AuthAPI.logout().then(data => {
      dispatch(setAuthUserData(null, null, null, null, false, false));
    });
  }
}

export default reducerAuth;