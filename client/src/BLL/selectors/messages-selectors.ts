import { RootState } from '../redux'

export const selectDialogsData = (state: RootState) => {
    return state.messagesPage.dialogs
}

export const selectMessages = (state: RootState) => {
    return state.messagesPage.messages
}
export const selectUserDialogId = (state: RootState) => {
    return state.messagesPage.userDialogId
}

export const selectMessagesTrim = (state: RootState) => {
    return state.messagesPage.trim
}

export const selectIsUserProfileMenuOpenStatus = (state: RootState) => {
    return state.messagesPage.isUserProfileMenuOpen
}
