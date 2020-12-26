import { authentication } from "./reducer-auth"
import { ThunkAction } from "redux-thunk"
import { RootState, InferActionTypes } from "./redux"
import { fontSizeObjectType } from '../types/AppTypes/appTypes'
import { setUserProfileThunk } from "./reducer-profile"
import { requestUsers } from "./reducer-friends"
import { getALLDialogs, getDialogMessages } from "./reducer-messages"
import { userDialogType } from "../types/MessagesTypes/messagesTypes"

const SET_TEXT_ERROR = 'app/SET_TEXT_ERROR'

type optionsType = {
  fontSize: Array<fontSizeObjectType>
  appFontSize: number
}

type appStateType = {
  isInitialized: boolean
  options: optionsType
  messageError: string
  isModalOpen: boolean
  date: string
}

const AppState = {
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
    appFontSize: 16
  },
  messageError: '',
  isModalOpen: false,
  date: ''
} as appStateType

const reducerApp = (state = AppState, action: ActionTypes): appStateType => {
  let stateCopy = { ...state }
  stateCopy.options = { ...state.options }
  stateCopy.options.fontSize = [...state.options.fontSize]
  switch (action.type) {
    case `app/SET_INITIALIZED`:
      return {
        ...state,
        isInitialized: true
      }
    case `app/SET_FONT_SIZE`:
      stateCopy.options.fontSize.forEach(item => {
        if (item.id === action.id) stateCopy.options.appFontSize = item.size
      })

      return stateCopy;
    case SET_TEXT_ERROR:
      return {
        ...state,
        messageError: action.text
      }
    case `app/SET_IS_MODAL_OPEN_STATUS`:
      return {
        ...state,
        isModalOpen: action.modalStatus
      }
    case `app/SET_CURRENT_DATE`:
      return {
        ...state,
        date: action.date
      }
    default:
      return state
  }
}

// Action Creators!

type ActionTypes = InferActionTypes<typeof actions> | setTextErrorActionType

export const actions = {
  initializedSuccessful: () => ({ type: `app/SET_INITIALIZED` } as const),
  setFontSize: (id: number) => ({ type: `app/SET_FONT_SIZE`, id } as const),
  setIsModalOpenStatus: (modalStatus: boolean) => ({ type: `app/SET_IS_MODAL_OPEN_STATUS`, modalStatus } as const),
  getCurrentDate: (date: string) => ({ type: `app/SET_CURRENT_DATE`, date } as const)
}

// Common Action Creators!

export type setTextErrorActionType = ({ type: typeof SET_TEXT_ERROR, text: string })
export const setTextError = (text: string): setTextErrorActionType => ({ type: SET_TEXT_ERROR, text })

// Thunk Creators!

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

export const initialize = (): ThunkType => async (dispatch, getState) => {
  let promise = dispatch(authentication())
  debugger
  let initialPromise = promise.then(() => {
    let userId = getState().auth.userId
    let currentPage = getState().Friends.usersInf.currentPage
    let pageSize = getState().Friends.usersInf.pageSize
    dispatch(setUserProfileThunk(userId))
    dispatch(getALLDialogs())
    dispatch(requestUsers(pageSize, currentPage))
    // Messages must be with the logic of first dialog!
    debugger
  }).then(() => {
    const dialog = getState().messagesPage.dialogsData.filter((item: userDialogType) => item.isActive && true).find((item: userDialogType) => item)
    let dialogId = dialog?.id
    if(dialogId) dispatch(getDialogMessages(dialogId))
  })
  initialPromise.then(() => {
    dispatch(actions.initializedSuccessful())
  })
}



export default reducerApp