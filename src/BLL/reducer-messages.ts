// import { MessagesAPI } from "../DAL/api";

const ADD_MESSAGE = 'messagesPage/ADD-MESSAGE';
// const SET_DIALOGS = 'SET-DIALOGS';

type userDialogType = {
    id: number
    nickname: string
    name: string
    lastMessage: string
    avatar: any
}
type message = {
    id: number
    messageText: string
}

type messagesPageType = {
    dialogsData: Array<userDialogType>
    messages: Array<message>
}

let messagesPage = {
    dialogsData: [
        {
            id: 1,
            nickname: 'John',
            name: 'John',
            lastMessage: 'Hello!',
            avatar: '',
        },
        {
            id: 2,
            nickname: 'Alan',
            name: 'Alan',
            lastMessage: 'Hi!',
            avatar: '',
        },
        {
            id: 3,
            nickname: 'Josh',
            name: 'Josh',
            lastMessage: 'The last message I\'ve written you!',
            avatar: '',
        },
        {
            id: 4,
            nickname: 'Jake',
            name: 'Jake',
            family: 'Hill',
            lastMessage: 'See you soon!',
            avatar: '',
        },
        {
            id: 5,
            nickname: 'Chris',
            name: 'Chris Heria',
            lastMessage: 'I Love You!',
            avatar: '',
        },
        {
            id: 6,
            nickname: 'LilPipka',
            name: 'Lil',
            lastMessage: 'Rate my new song please!',
            avatar: '',
        },
        {
            id: 7,
            nickname: 'Thomas',
            name: 'Thomas',
            lastMessage: 'Hey, how is it going?',
            avatar: '',
        },
        {
            id: 8,
            nickname: 'Static_Alex',
            name: 'Alex',
            lastMessage: 'She was the one with the broken smile...',
            avatar: '',
        },
        {
            id: 9,
            nickname: 'Hayden',
            name: 'Hayden',
            lastMessage: 'Car engine died!',
            avatar: '',
        },
        {
            id: 10,
            nickname: "Yana",
            name: 'Yana',
            lastMessage: "Everything will be alright!",
            avatar: '',
        }
    ],
    messages: [
        {
            id: 1,
            messageText: 'Hello World !!!',
        },
        {
            id: 2,
            messageText: 'How is it going?',
        },
        {
            id: 3,
            messageText: 'Would u like to go for a walk?',
        }
    ],
} as messagesPageType

const reducerMessages = (state = messagesPage, action: any): messagesPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.messages.length + 1,
                messageText: action.messageText,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        // case SET_DIALOGS: 
        //     return {
        //         ...state,
        //         dialogsData: action.dialogs
        //     }
        default:
            return state;
    }
}

/* Action Creators! */

type addMessageActionType = {
    type: typeof ADD_MESSAGE
    messageText: string
}

export const addMessage = (messageText:string):addMessageActionType => {
    return { type: ADD_MESSAGE, messageText }
}
// const setDialogs = dialogs => {
//     return { type: SET_DIALOGS, dialogs }
// }

/* Thunk Creators! */

// export const getDialogs = () => async (dispatch) => {
//     let data = await MessagesAPI.getDialogs();
//     dispatch(setDialogs(data));
// }

export default reducerMessages;