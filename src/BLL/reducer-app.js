import { authentication } from "./reducer-auth";

const SET_INITIALIZED = 'SET_INITIALIZED';

let AppState = {
  isInitialized: false,
  options: {
    fontSize: [
      {
        title: 'ExtraSmall',
        size: 10
      },
      {
        title: 'Small',
        size: 12
      },
      {
        title: 'Normal',
        size: 16
      }, 
      {
        title: 'Enlarged',
        size: 20
      },
      {
        title: 'Large',
        size: 30
      },
      {
        title: 'ExtraLarge',
        size: 40
      },
      {
        title: 'MegaLarge',
        size: 50
      }
    ],
  }
}

const reducerApp = (state = AppState, action) => {
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