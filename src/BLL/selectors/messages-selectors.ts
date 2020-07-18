import { RootState } from '../redux'

export const getDialogsData = (state: RootState) => {
    return state.messagesPage.dialogsData
}

export const getMessages = (state: RootState) => {
    return state.messagesPage.messages
}