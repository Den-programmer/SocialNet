import { ThunkAction } from "redux-thunk"
import { RootState, InferActionTypes } from "./redux"
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'
import { MessagesAPI } from "../DAL/messagesApi"
import { resultCode } from "../DAL/api"

type messagesPageType = {
    dialogsData: Array<userDialogType>
    messages: Array<message>
}

const messagesPage = {
    dialogsData: [
        {
            id: 1,
            nickname: 'John',
            name: 'John',
            lastMessage: 'Hello!',
            avatar: ''
        },
        {
            id: 2,
            nickname: 'Alan',
            name: 'Alan',
            lastMessage: 'Hi!',
            avatar: ''
        },
        {
            id: 3,
            nickname: 'Josh',
            name: 'Josh',
            lastMessage: 'The last message I\'ve written you!',
            avatar: ''
        },
        {
            id: 4,
            nickname: 'Jake',
            name: 'Jake',
            family: 'Hill',
            lastMessage: 'See you soon!',
            avatar: ''
        },
        {
            id: 5,
            nickname: 'Chris',
            name: 'Chris Heria',
            lastMessage: 'I Love You!',
            avatar: ''
        },
        {
            id: 6,
            nickname: 'LilPipka',
            name: 'Lil',
            lastMessage: 'Rate my new song please!',
            avatar: ''
        },
        {
            id: 7,
            nickname: 'Thomas',
            name: 'Thomas',
            lastMessage: 'Hey, how is it going?',
            avatar: ''
        },
        {
            id: 8,
            nickname: 'Static_Alex',
            name: 'Alex',
            lastMessage: 'She was the one with the broken smile...',
            avatar: ''
        },
        {
            id: 9,
            nickname: 'Hayden',
            name: 'Hayden',
            lastMessage: 'Car engine died!',
            avatar: ''
        },
        {
            id: 10,
            nickname: "Yana",
            name: 'Yana',
            lastMessage: "Everything will be alright!",
            avatar: ''
        }
    ],
    messages: [
        {
            id: 1,
            messageText: 'Hello World !!!'
        },
        {
            id: 2,
            messageText: 'How is it going?'
        },
        {
            id: 3,
            messageText: 'Would u like to go for a walk?'
        }
    ],
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
        default:
            return state;
    }
}

/* Action Creators! */

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    addMessage: (messageText:string) => ({ type: `sn/messagesPage/ADD-MESSAGE`, messageText } as const),
    setMessages: (messages: Array<message>) => ({ type: `sn/messagesPage/SET-MESSAGES`, messages } as const),
    setDialogs: (dialogs: Array<userDialogType>) => ({ type: `sn/messagesPage/SET-DIALOGS`, dialogs } as const),
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