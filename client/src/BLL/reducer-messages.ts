import { ThunkAction } from "redux-thunk"
import { RootState, InferActionTypes } from "./redux"
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'
import { MessagesAPI } from "../DAL/messagesApi"
import { resultCode } from "../DAL/api"

const messagesPage = {
    dialogsData: [
        {
            hasNewMessages: false,
            id: "0",
            lastDialogActivityDate: new Date(),
            lastUserActivityDate: new Date(),
            newMessagesCount: 0,
            photos: {
                small: null,
                large: null
            },
            userName: "Denis",
            isActive: false,
            lastMessage: "Hello, how are you?",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ] as Array<userDialogType>,
    messages: [
        {
            id: 1,
            messageText: "This text has no meaning...",
            sender: "user"
        }
    ] as Array<message>,
    userDialogId: "0",
    trim: '',
    isUserProfileMenuOpen: false
}

type MessagesPageType = typeof messagesPage;

const reducerMessages = (state = messagesPage, action: ActionTypes): MessagesPageType => {
    switch (action.type) {
        case `sn/messagesPage/ADD-MESSAGE`:
            const newMessage = {
                id: state.messages.length + 1,
                messageText: action.messageText
            } as message
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        case `sn/messagesPage/SET-DIALOGS`:
            const dialogsData = action.dialogs.map((item: userDialogType, index) => {
                if (index === 0) return { ...item, isActive: true }
                return { ...item, isActive: false }
            })
            const currentDialog = dialogsData.filter((item: userDialogType) => item.isActive && true).find((item: userDialogType) => item)
            let currentDialogId = currentDialog !== undefined ? currentDialog.id : "0"
            return {
                ...state,
                userDialogId: currentDialogId,
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
                userDialogId: action.userId,
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
        case `sn/messagesPage/SET_MESSAGES_TRIM`:
            return {
                ...state,
                trim: action.trim
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
    setUserDialogId: (userId: string) => ({ type: `sn/messagesPage/SET-USER-DIALOG-ID`, userId } as const),
    setUserActiveStatus: (userId: string) => ({ type: `sn/messagesPage/SET-USER-ACTIVE-STATUS`, userId } as const),
    setUserProfileMenuStatus: (status: boolean) => ({ type: `sn/messagesPage/SET_USER_PROFILE_MENU_STATUS`, status } as const),
    setMessagesTrim: (trim: string) => ({ type: `sn/messagesPage/SET_MESSAGES_TRIM`, trim } as const)
}

/* Thunk Creators! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionTypes>

export const getALLDialogs = (): ThunkType => async (dispatch) => {
    try {
        debugger
        const data = await MessagesAPI.getALLDialogs()
        dispatch(actions.setDialogs(data))
        return data
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}
export const startDialog = (userId: string): ThunkType => async (dispatch) => {
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
export const getDialogMessages = (userId: string): ThunkType => async (dispatch) => {
    try {
        const data = await MessagesAPI.getDialogMessages(userId)
        dispatch(actions.setMessages(data.items))
        return data
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}

export const sendMessage = (userId: string, message: string): ThunkType => async (dispatch) => {
    try {
        debugger
        const data = await MessagesAPI.sendDialogMessages(userId, message)
        debugger
        dispatch(actions.addMessage(message))
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}

export default reducerMessages