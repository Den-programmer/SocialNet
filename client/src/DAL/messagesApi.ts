import { instance, ServerResType } from './api'
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'

type dialogsType = Array<userDialogType>

type dialogMessagesResType = {
    items: Array<message>
    totalCount: number
    error: null | string
}
// Not exact type
type isMessageViewedtype = {
    isViewed: boolean
}


export const MessagesAPI = {
    getALLDialogs: () => {
        return instance.get<dialogsType>(`api/dialogs/getAllDialogs`).then(res => res.data)
    },
    startDialog: (userId: string) => {
        return instance.post<ServerResType<userDialogType>>(`api/dialogs/addDialog/${userId}`).then(res => res.data)
    },
    getDialogMessages: (userId: string) => {
        return instance.get<dialogMessagesResType>(`dialogs/${userId}/messages`).then(res => res.data)
    },
    sendDialogMessages: (userId: string, message: string) => {
        debugger
        return instance.post<ServerResType<{}>>(`dialogs/${userId}/messages`, { message }).then(res => res.data)
    },
    isMessageViewed: (messageId: number) => {
        return instance.get<ServerResType<isMessageViewedtype>>(`dialogs/messages/${messageId}/viewed`).then(res => res.data)
    },
    getNewDialogs: () => {
        return instance.get<ServerResType<{}>>(`dialogs/messages/new/count`).then(res => res.data)
    }
}