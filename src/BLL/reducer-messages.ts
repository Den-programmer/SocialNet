import { ThunkAction } from "redux-thunk"
import { RootState, InferActionTypes } from "./redux"
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'
import { MessagesAPI } from "../DAL/messagesApi"
import { resultCode } from "../DAL/api"

type messagesPageType = {
    dialogsData: Array<userDialogType>
    messages: Array<message>
    userDialogId: number | null
}

const messagesPage = {
    dialogsData: [],
    messages: [
        {
            id: 1,
            messageText: 'Choose the user to see his messages!'
        }
    ],
    userDialogId: null
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
            return {
                ...state,
                dialogsData: action.dialogs
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
        default:
            return state
    }
}

/* Action Creators! */

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    addMessage: (messageText:string) => ({ type: `sn/messagesPage/ADD-MESSAGE`, messageText } as const),
    setMessages: (messages: Array<message>) => ({ type: `sn/messagesPage/SET-MESSAGES`, messages } as const),
    setDialogs: (dialogs: Array<userDialogType>) => ({ type: `sn/messagesPage/SET-DIALOGS`, dialogs } as const),
    setUserDialogId: (userId: number) => ({ type: `sn/messagesPage/SET-USER-DIALOG-ID`, userId } as const)
}

/* Thunk Creators! */

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

export const getALLDialogs = ():ThunkType => async (dispatch) => {
   try {
    const data = await MessagesAPI.getALLDialogs()

    dispatch(actions.setDialogs(data))
   } catch(e) {
    alert(`Something's gone wrong, error status: 500`)
   }
}
export const startDialog = (userId: number): ThunkType => async (dispatch) => {
    try {
        const data = await MessagesAPI.startDialog(userId)
        if(data.resultCode === resultCode.Success) {
            dispatch(getALLDialogs())    
        } else {
            alert(`Some error!!!!!!!`)
        }
    } catch(e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}
export const getDialogMessages = (userId: number): ThunkType => async (dispatch) => {
    try {
        const data = await MessagesAPI.getDialogMessages(userId)

        if(!data.error) {
            dispatch(actions.setMessages(data.items))
        } else {
            alert(`There's error at server request: getDialogMessages!`)
        }
    } catch(e) {
        alert(`Something's gone wrong, error status: 500`)
    }
}

export default reducerMessages