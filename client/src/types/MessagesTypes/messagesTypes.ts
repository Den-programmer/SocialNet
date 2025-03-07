export type message = {
    id: number
    messageText: string | null
    sender: string
    avatar: string
}
export type userDialogType = {
    hasNewMessages: false
    id: string
    lastDialogActivityDate: string
    lastUserActivityDate: string 
    newMessagesCount: number
    photos: {
        small: null | string,
        large: null | string
    }
    userName: string
    isActive: boolean
    lastMessage?: string | null
}