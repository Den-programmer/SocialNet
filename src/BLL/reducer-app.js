import { authentication } from "./reducer-auth";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
   isInitialized: false,
}

const reducerApp = (state = initialState, action) => {
  let stateCopy = { ...state }

  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        isInitialized: true
      }

    default:
      return state;
  }
}

const initializedSuccessful = () => {
  return { type: SET_INITIALIZED }
}

export const initialize = () => (dispatch) => {
  let promise = dispatch(authentication());

  promise.then(() => {
    dispatch(initializedSuccessful());
  });
}



export default reducerApp;