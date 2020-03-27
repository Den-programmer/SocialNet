let ADD_MESSAGE = 'ADD-MESSAGE';
let NEW_MESSAGE_CHANGE = 'NEW-MESSAGE-CHANGE';

export const addMessageActionCreator = (messageText) => {
    return { type: ADD_MESSAGE, messageText: messageText }
}
export const onNewMessageChangeActionCreator = (newMessageValue) => {
    return { type: NEW_MESSAGE_CHANGE, newMessageValue: newMessageValue }
}

export let messagesPage = {
    dialogsData: [
        {
            id: 1,
            name: 'John',
            lastMessage: 'Hello!',
        },
        {
            id: 2,
            name: 'Alan',
            lastMessage: 'Hi!',
        },
        {
            id: 3,
            name: 'Josh',
            lastMessage: 'The last message I\'ve written you!',
        },
        {
            id: 4,
            name: 'Jake',
            family: 'Hill',
            lastMessage: 'See you soon!',
        },
        {
            id: 5,
            name: 'Chris',
            lastMessage: 'I Love You!',
        },
        {
            id: 6,
            name: 'Lil',
            lastMessage: 'Rate my new song please!',
        },
        {
            id: 7,
            name: 'Thomas',
            lastMessage: 'Hey, how is it going?',
        },
        {
            id: 8,
            name: 'Alex',
            lastMessage: 'She was the one with the broken smile...',
        },
        {
            id: 9,
            name: 'Hayden',
            lastMessage: 'Car engine died!',
        },
        {
            id: 10,
            name: "Yana",
            lastMessage: "Everything will be alright!",
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
    NewMessageValue: 'p;k;ko;',
}

const reducerMessages = (state = messagesPage, action) => {

    if (action.type === ADD_MESSAGE) {
        let newMessage = {
            id: state.messages.length + 1,
            messageText: action.messageText,
        }
        state.messages.push(newMessage);
    } else if (action.type === NEW_MESSAGE_CHANGE) {
        state.newMessageValue = action.newMessageValue;
    }

    return state;
}

export default reducerMessages;