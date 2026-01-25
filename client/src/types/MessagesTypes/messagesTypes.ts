export type message = {
    _id: number
    messageText: string | null
    sender: string
    image: string
}
export type userDialogType = {
    hasNewMessages?: boolean   // I need to remove the "?" later there, where it should be removed 
    _id: string
    participants: Array<string>
    lastDialogActivityDate?: Date
    lastUserActivityDate?: Date
    newMessagesCount?: number
    photos: {
        small: any
        large: any
    },
    username: string
    isActive?: boolean
    lastMessage?: string
    createdAt?: Date,
    updatedAt?: Date
}