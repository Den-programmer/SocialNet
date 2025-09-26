import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from './api'
import { userDialogType, message } from '../types/MessagesTypes/messagesTypes'

type dialogsType = Array<userDialogType>

type dialogMessagesResType = {
  items: Array<message>
  totalCount: number
  error: null | string
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  tagTypes: ['Messages', 'LIST'],
  endpoints: (builder) => ({
    getAllDialogs: builder.query<dialogsType, void>({
      query: () => `api/dialogs/getAllDialogs`,
      providesTags: [{ type: 'Messages', id: 'LIST' }],
      transformResponse: (response: ServerResType<{ dialogs: dialogsType }>) =>
        response.data.dialogs
    }),
    startDialog: builder.mutation<any, string>({
      query: (userId) => ({
        url: `api/dialogs/addDialog/${userId}`,
        method: 'POST'
      })
    }),
    getDialogMessages: builder.query<dialogMessagesResType, { userId1: string; userId2: string }>({
      query: ({ userId1, userId2 }) => `api/messages/getMessagesBetweenUsers/${userId1}/${userId2}`,
      providesTags: (result, error, { userId1 }) => [{ type: 'Messages', id: userId1 }]
    }),
    sendDialogMessages: builder.mutation<
      any,
      { userId: string; message: string | undefined; image: string | undefined }
    >({
      query: ({ userId, message, image }) => ({
        url: `api/messages/addMessage/${userId}`,
        method: 'POST',
        body: { content: message, image }
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Messages', id: userId },
        { type: 'Messages', id: 'LIST' }
      ]
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