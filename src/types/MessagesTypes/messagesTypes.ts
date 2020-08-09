export type message = {
    id: number
    messageText: string | null
}
export type userDialogType = {
    hasNewMessages: false
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string 
    newMessagesCount: number
    photos: {
        small: null | string,
        large: null | string
    }
    userName: string
    lastMessage?: string | null
}