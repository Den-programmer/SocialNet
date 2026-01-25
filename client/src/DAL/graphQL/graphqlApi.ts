import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userDialogType } from '../../types/MessagesTypes/messagesTypes'

// GraphQL queries/mutations 
const GET_ALL_DIALOGS = `
  query GetAllDialogs {
    dialogs {
      id
      updatedAt
      participants {
        id
        username
        email
        photos {
          small
          large
        }
      }
      messages {
        id
        text
        image
        createdAt
        sender {
          id
          username
        }
        receiver {
          id
          username
        }
      }
    }
  }
`

const GET_DIALOG_MESSAGES = `
  query GetDialogMessages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      id
      text
      createdAt
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
    }
  }
`

const START_DIALOG = `
  mutation StartDialog($userId: ID!) {
    startDialog(userId: $userId) {
      id
      updatedAt
      participants {
        id
        username
        email
      }
    }
  }
`

const SEND_DIALOG_MESSAGE = `
  mutation SendDialogMessage($conversationId: ID!, $text: String!, $image: String) {
    sendMessage(conversationId: $conversationId, text: $text, image: $image) {
      id
      text
      createdAt
      image
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
    }
  }
`

type dialogsType = Array<userDialogType>

export type messageResClient = {
  id: string
  senderId: string
  receiverId: string
  content: string
  image?: string
  timestamp: string
}

export type messageRes = {
  messages: Array<messageResClient>
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/graphql',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    }
  }),
  tagTypes: ['Messages', 'LIST'],

  endpoints: (builder) => ({

    getAllDialogs: builder.query({
      query: () => ({
        url: '',
        method: 'POST',
        body: { query: GET_ALL_DIALOGS }
      }),
      transformResponse: (res) => {
        if (res?.errors) {
          console.error('getAllDialogs graphql errors:', res.errors)
          return [] as dialogsType
        }
        return res?.data?.dialogs || [] as dialogsType
      },
      providesTags: [{ type: 'Messages', id: 'LIST' }]
    }),

    startDialog: builder.mutation({
      query: (userId) => ({
        url: '',
        method: 'POST',
        body: { query: START_DIALOG, variables: { userId } }
      }),
      transformResponse: (res) => {
        if (res?.errors) {
          console.error('startDialog graphql errors:', res.errors)
          return null
        }
        return res.data.startDialog.participants as dialogsType
      },
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }]
    }),

    getDialogMessages: builder.query({
      query: ({ userId1, userId2 }) => ({
        url: '',
        method: 'POST',
        body: { query: GET_DIALOG_MESSAGES, variables: { conversationId: userId2 } }
      }),
      transformResponse: (res) => {
        if (res?.errors) {
          console.error('getDialogMessages graphql errors:', res.errors)
          return { data: { messages: [] } }
        }
        const raw = res?.data?.messages ?? []
        const messages = raw.map((m: any) => ({
          id: m.id,
          senderId: m.sender?.id ?? '',
          receiverId: m.receiver?.id ?? '',
          content: m.text ?? '',
          image: m.image ?? undefined,
          timestamp: m.createdAt ?? ''
        }))
        return { data: { messages } }
      }
    }),

    sendDialogMessages: builder.mutation({
      query: ({ conversationId, text, image }) => ({
        url: '',
        method: 'POST',
        body: { query: SEND_DIALOG_MESSAGE, variables: { conversationId, text, image } }
      }),
      transformResponse: (res) => {
        if (res?.errors) {
          console.error('sendDialogMessages graphql errors:', res.errors)
          return null
        }
        const m = res?.data?.sendMessage
        if (!m) return null
        return {
          id: m.id,
          senderId: m.sender?.id ?? '',
          receiverId: m.receiver?.id ?? '',
          content: m.text ?? '',
          image: m.image ?? undefined,
          timestamp: m.createdAt ?? ''
        }
      },
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }]
    })
  })
})

export const {
  useGetAllDialogsQuery,
  useStartDialogMutation,
  useGetDialogMessagesQuery,
  useSendDialogMessagesMutation
} = messagesApi