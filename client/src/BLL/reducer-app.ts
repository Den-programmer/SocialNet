import { login } from "./reducer-auth"
import { ThunkAction } from "redux-thunk"
import { RootState, InferActionTypes } from "./redux"
import { setUserProfileThunk } from "./reducer-profile"
import { requestUsers } from "./reducer-friends"
import { getALLDialogs, getDialogMessages } from "./reducer-messages"

const SET_TEXT_ERROR = 'app/SET_TEXT_ERROR'


type appStateType = {
  isInitialized: boolean
  messageError: string
  isModalOpen: boolean
  date: string
}

const AppState = {
  isInitialized: false,
  messageError: '',
  isModalOpen: false,
  date: ''
} as appStateType

const reducerApp = (state = AppState, action: ActionTypes): appStateType => {
  switch (action.type) {
    case `app/SET_INITIALIZED`:
      return {
        ...state,
        isInitialized: true
      }
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
  setIsModalOpenStatus: (modalStatus: boolean) => ({ type: `app/SET_IS_MODAL_OPEN_STATUS`, modalStatus } as const),
  getCurrentDate: (date: string) => ({ type: `app/SET_CURRENT_DATE`, date } as const)
}

// Common Action Creators!

export type setTextErrorActionType = ({ type: typeof SET_TEXT_ERROR, text: string })
export const setTextError = (text: string): setTextErrorActionType => ({ type: SET_TEXT_ERROR, text })

// Thunk Creators!

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

export const initialize = (): ThunkType => async (dispatch, getState) => {
  // @ts-ignore
  const data = JSON.parse(localStorage.getItem('userData'))
  if (data && data.token) {
    const { email, password, rememberMe, captcha } = data
    try {
      await dispatch(login(email, password, rememberMe, captcha))
      const userId = getState().auth.userId
      await dispatch(setUserProfileThunk(userId))
      dispatch(actions.initializedSuccessful())
    } catch (error) {
      console.error("New Error from reducer app!", error)
    }
  }
  dispatch(actions.initializedSuccessful())
  // let initialPromise = promise.then(() => {
  //   let userId = getState().auth.userId
  //   let currentPage = getState().Friends.usersInf.currentPage
  //   let pageSize = getState().Friends.usersInf.pageSize
  //   let term = getState().Friends.filter.term
  //   dispatch(setUserProfileThunk(userId))
  //   dispatch(getALLDialogs())
  //   dispatch(requestUsers(pageSize, currentPage, term))
  // }).then(() => {
  //   setTimeout(() => {
  //     let dialogId: number = getState().messagesPage.userDialogId
  //     dispatch(getDialogMessages(dialogId))
  //   }, 1000)
  // })
}

// Get State!

export const _getDate = () => AppState.date



export default reducerApp