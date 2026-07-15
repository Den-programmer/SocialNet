import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from '../api'
import { Msg } from '../../components/Article/AIPage/AIChatInterface/aiChatInterface'
import { AIConversation, AISearchResponse } from '../../types/AITypes/aiTypes';



export const aiApi = createApi({
  reducerPath: 'aiApi',
  baseQuery,
  tagTypes: ['Messages', 'Conversations'],
  endpoints: builder => ({
    getChatCompletion: builder.mutation({
      query: ({ conversationId, content }) => ({
        url: 'api/ai/chat',
        method: 'POST',
        body: { conversationId, content }
      }),
      invalidatesTags: ['Messages', 'Conversations']
    }),
    getConversations: builder.query<ServerResType<AIConversation[]>, void>({
      query: () => 'api/ai/conversations',
      providesTags: ['Conversations']
    }),
    renameConversation: builder.mutation<
      ServerResType<AIConversation>,
      { conversationId: string; title: string }
    >({
      query: ({ conversationId, title }) => ({
        url: `/api/ai/conversations/${conversationId}`,
        method: 'PATCH',
        body: { title }
      }),
      invalidatesTags: ['Conversations']
    }),
    getMessages: builder.query<
      ServerResType<Msg[]>,
      string
    >({
      query: (conversationId) =>
        `api/ai/conversations/${conversationId}/messages`,
      providesTags: ['Messages']
    }),
    createConversation: builder.mutation<
      ServerResType<{ _id: string }>,
      void
    >({
      query: () => ({
        url: '/api/ai/conversations',
        method: 'POST'
      }),
      invalidatesTags: ['Conversations']
    }),
    deleteConversation: builder.mutation<
      ServerResType<{ deleted: boolean }>,
      string
    >({
      query: (conversationId) => ({
        url: `/api/ai/conversations/${conversationId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Conversations', 'Messages']
    }),
    searchPosts: builder.query<
      ServerResType<AISearchResponse>,
      {
        query: string
        limit?: number
      }
    >({
      query: ({ query, limit = 10 }) => ({
        url: '/api/ai/posts/search',
        params: {
          query,
          limit
        }
      })
    })
  })
})

export const {
  useGetChatCompletionMutation,
  useCreateConversationMutation,
  useRenameConversationMutation,
  useDeleteConversationMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSearchPostsQuery
} = aiApi
