import { authentication } from "./reducer-auth";

const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_FONT_SIZE = 'SET_FONT_SIZE';

let AppState = {
  isInitialized: false,
  options: {
    fontSize: [
      {
        id: 1,
        title: 'ExtraSmall',
        size: 10
      },
      {
        id: 2,
        title: 'Small',
        size: 12
      },
      {
        id: 3,
        title: 'Normal',
        size: 16
      }, 
      {
        id: 4,
        title: 'Enlarged',
        size: 20
      },
      {
        id: 5,
        title: 'Large',
        size: 30
      },
      {
        id: 6,
        title: 'ExtraLarge',
        size: 40
      },
      {
        id: 7,
        title: 'MegaLarge',
        size: 50
      }
    ],
    appFontSize: 16,
  }
}

const reducerApp = (state = AppState, action) => {
  let stateCopy = { ...state }
  stateCopy.options = {...state.options}
  stateCopy.options.fontSize = [...state.options.fontSize];
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        isInitialized: true
      }
    case SET_FONT_SIZE: 
      stateCopy.options.fontSize.forEach(item => {
        if(item.id == action.id) {
          stateCopy.options.appFontSize = item.size;
        }
      });
      console.log(stateCopy.options.appFontSize)

      return stateCopy;  
    default:
      return state;
  }
}

// Action Creators!

const initializedSuccessful = () => {
  return { type: SET_INITIALIZED }
}
export const setFontSize = (id) => {
  return { type: SET_FONT_SIZE, id }
}

// Thunk Creators!

export const initialize = () => (dispatch) => {
  let promise = dispatch(authentication());

  promise.then(() => {
    dispatch(initializedSuccessful());
  });
}



export default reducerApp;