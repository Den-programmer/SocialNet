import { ThunkAction } from "redux-thunk"
import { RootState, InferActionTypes } from "./redux"
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'
import { MessagesAPI } from "../DAL/messagesApi"
import { resultCode } from "../DAL/api"

type messagesPageType = {
    dialogsData: Array<userDialogType>
    messages: Array<message>
    userDialogId: number | null
    isUserProfileMenuOpen: boolean
}

// Photo may be as a string of message, so can do this logic more simply!

const messagesPage = {
    dialogsData: [],
    messages: [],
    userDialogId: null,
    isUserProfileMenuOpen: false
} as messagesPageType

const reducerMessages = (state = messagesPage, action: ActionTypes): messagesPageType => {
    switch (action.type) {
        case `sn/messagesPage/ADD-MESSAGE`:
            const newMessage = {
                id: state.messages.length + 1,
                messageText: action.messageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        case `sn/messagesPage/SET-DIALOGS`:
            const dialogsData = action.dialogs.map((item: userDialogType, index) => {
                if (index === 0) return { ...item, isActive: true }
                return { ...item, isActive: false }
            })
            return {
                ...state,
                dialogsData
            }
        case `sn/messagesPage/SET-MESSAGES`:
            return {
                ...state,
                messages: action.messages
            }
        case `sn/messagesPage/SET-USER-DIALOG-ID`:
            return {
                ...state,
                userDialogId: action.userId
            }
        case `sn/messagesPage/SET-USER-ACTIVE-STATUS`:
            return {
                ...state,
                dialogsData: state.dialogsData.map((item: userDialogType) => {
                    if (action.userId === item.id) return { ...item, isActive: true }
                    return { ...item, isActive: false }
                })
            }
        case `sn/messagesPage/SET_USER_PROFILE_MENU_STATUS`:
            return {
                ...state,
                isUserProfileMenuOpen: action.status
            }
        default:
            return state
    }
}

/* Action Creators! */

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    addMessage: (messageText: string) => ({ type: `sn/messagesPage/ADD-MESSAGE`, messageText } as const),
    setMessages: (messages: Array<message>) => ({ type: `sn/messagesPage/SET-MESSAGES`, messages } as const),
    setDialogs: (dialogs: Array<userDialogType>) => ({ type: `sn/messagesPage/SET-DIALOGS`, dialogs } as const),
    setUserDialogId: (userId: number) => ({ type: `sn/messagesPage/SET-USER-DIALOG-ID`, userId } as const),
    setUserActiveStatus: (userId: number) => ({ type: `sn/messagesPage/SET-USER-ACTIVE-STATUS`, userId } as const),
    setUserProfileMenuStatus: (status: boolean) => ({ type: `sn/messagesPage/SET_USER_PROFILE_MENU_STATUS`, status } as const)
}

/* Thunk Creators! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionTypes>

export const getALLDialogs = (): ThunkType => async (dispatch) => {
    try {
        const data = await MessagesAPI.getALLDialogs()

        dispatch(actions.setDialogs(data))
        return data
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}
export const startDialog = (userId: number): ThunkType => async (dispatch) => {
    try {
        const data = await MessagesAPI.startDialog(userId)
        if (data.resultCode === resultCode.Success) {
            dispatch(getALLDialogs())
        } else {
            alert(`Some error!!!!!!!`)
        }
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}
export const getDialogMessages = (userId: number): ThunkType => async (dispatch) => {
    try {
        const data = await MessagesAPI.getDialogMessages(userId)
        debugger
        dispatch(actions.setMessages(data.items))
        return data
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}

export default reducerMessages