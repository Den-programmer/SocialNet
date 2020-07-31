export type message = {
    id: number
    messageText: string | null
}
export type userDialogType = {
    id: number
    nickname: string
    name: string
    messages: Array<message>
    lastMessage: string
    avatar: any
}