import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from '../api'

export const aiApi = createApi({
  reducerPath: 'aiApi',
  baseQuery,
  endpoints: builder => ({
    getChatCompletion: builder.mutation<ServerResType<{ content: string }>, string>({
      query: (content) => ({
        url: 'api//ai/chat',
        method: 'POST',
        body: { content }
      })
    })
  })
})

export const {
  useGetChatCompletionMutation
} = aiApi
