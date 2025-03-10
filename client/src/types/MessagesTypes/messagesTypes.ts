export type message = {
    id: number
    messageText: string | null
    sender: string
    avatar: string
}
export type userDialogType = {
    hasNewMessages: boolean
    id: string
    lastDialogActivityDate: Date
    lastUserActivityDate: Date
    newMessagesCount: number
    photos: {
        small: any
        large: any
    },
    userName: string
    isActive: boolean
    lastMessage?: string
    createdAt: Date,
    updatedAt: Date
}