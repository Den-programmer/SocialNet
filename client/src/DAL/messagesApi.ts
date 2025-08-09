import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from './api'
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'

type dialogsType = Array<userDialogType>

type dialogMessagesResType = {
  items: Array<message>
  totalCount: number
  error: null | string
}

// type isMessageViewedtype = {
//   isViewed: boolean
// }

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllDialogs: builder.query<dialogsType[], void>({
      query: () => `api/dialogs/getAllDialogs`,
      transformResponse: (response: ServerResType<{ dialogs: dialogsType[]}>) => response.data.dialogs
    }),
    startDialog: builder.mutation<any, string>({
      query: (userId) => ({
        url: `api/dialogs/addDialog/${userId}`,
        method: 'POST'
      })
    }),
    getDialogMessages: builder.query<dialogMessagesResType, string>({
      query: (userId) => `api/dialogs/${userId}/messages`
    }),
    sendDialogMessages: builder.mutation<any, { userId: string, message: string | undefined, image: string | undefined }>({
      query: ({ userId, message, image }) => ({
        url: `api/message/addMessage/${userId}`,
        method: 'POST',
        body: { message, image }
      })
    }),
    isMessageViewed: builder.query<any, number>({
      query: (messageId) => `api/dialogs/messages/${messageId}/viewed`
    }),
    getNewDialogs: builder.query<any, void>({
      query: () => `api/dialogs/messages/new/count`
    })
  })
})

export const {
  useGetAllDialogsQuery,
  useStartDialogMutation,
  useGetDialogMessagesQuery,
  useSendDialogMessagesMutation,
  useIsMessageViewedQuery,
  useGetNewDialogsQuery
} = messagesApi