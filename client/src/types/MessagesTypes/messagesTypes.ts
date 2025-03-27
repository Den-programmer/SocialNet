export type message = {
    _id: number
    messageText: string | null
    sender: string
    image: string
}
export type userDialogType = {
    hasNewMessages: boolean
    _id: string
    participants: Array<string>
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