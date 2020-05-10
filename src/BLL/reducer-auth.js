import { AuthAPI } from '../DAL/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let auth = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const reducerAuth = (state = auth, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: 
            return {
                ...state,
                ...action.data
            }
        default:  
            return state;    
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return { type: SET_AUTH_USER_DATA, data: { userId, email, login, isAuth }}
}

export const authentication = () => {
    return (dispatch) => {
      AuthAPI.auth().then(data => {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, data.resultCode));
      });
    }
  }

export default reducerAuth;