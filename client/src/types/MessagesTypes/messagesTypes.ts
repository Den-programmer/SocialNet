export type MessageParticipant = {
    id: string
    username: string
    email?: string
    photos: {
        small: string | null
        large: string | null
    }
}

export type MessageType = {
    id: string
    text: string | null
    image?: string | null
    createdAt: string
    conversationId: string
    sender: MessageParticipant
    receiver: MessageParticipant
}

export type userDialogType = {
    id: string
    updatedAt: string
    participants: MessageParticipant[]
    messages: MessageType[]
    isActive?: boolean
    hasNewMessages?: boolean
    newMessagesCount?: number
}