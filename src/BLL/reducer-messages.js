let ADD_MESSAGE = 'ADD-MESSAGE';

export const addMessageActionCreator = (messageText) => {
    return { type: ADD_MESSAGE, messageText: messageText }
}

const reducerMessages = (state, action) => {

    if (action.type === ADD_MESSAGE) {
        let newMessage = {
            id: state.messages.length + 1,
            messageText: action.messageText,
        }
        state.messages.push(newMessage);
    }

    return state;
}

export default reducerMessages;