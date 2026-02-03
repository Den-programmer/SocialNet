import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from '../api'

export const aiApi = createApi({
  reducerPath: 'aiApi',
  baseQuery,
  endpoints: builder => ({
    getGroqChatCompletion: builder.query<
      ServerResType<{ content: string }>,
      string
    >({
      query: (content) => ({
        url: '/api/ai/getAIoutput',
        method: 'POST',
        body: { content }
      })
    })
  })
})

export const {
    useGetGroqChatCompletionQuery
} = aiApi
