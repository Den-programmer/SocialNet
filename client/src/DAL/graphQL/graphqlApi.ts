import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useState, useEffect, useRef } from 'react'
import { userDialogType } from '../../types/MessagesTypes/messagesTypes'
import { getToken } from '../../BLL/reducer-auth'
import { wsClient } from './wsClient'

// ===== GraphQL operation strings =====

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
        conversationId
        sender {
          id
          username
          photos { small large }
        }
        receiver {
          id
          username
        }
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
        photos { small large }
      }
      messages {
        id
        text
        image
        createdAt
        conversationId
        sender { id username photos { small large } }
        receiver { id username }
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
      conversationId
      sender {
        id
        username
        photos { small large }
      }
      receiver {
        id
        username
      }
    }
  }
`

const DELETE_MESSAGE = `
  mutation DeleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId)
  }
`

const SUBSCRIPTION_MESSAGE_SENT = `
  subscription OnMessageSent($conversationId: ID) {
    messageSent(conversationId: $conversationId) {
      id
      text
      image
      createdAt
      conversationId
      sender {
        id
        username
        photos { small large }
      }
      receiver {
        id
        username
      }
    }
  }
`

const SUBSCRIPTION_MESSAGE_DELETED = `
  subscription OnMessageDeleted($conversationId: ID) {
    messageDeleted(conversationId: $conversationId) {
      messageId
      conversationId
    }
  }
`

const SUBSCRIPTION_DIALOG_STARTED = `
  subscription OnDialogStarted {
    dialogStarted {
      id
      updatedAt
      participants {
        id
        username
        email
        photos { small large }
      }
      messages {
        id
        text
        image
        createdAt
        conversationId
        sender { id username photos { small large } }
        receiver { id username }
      }
    }
  }
`

const SUBSCRIPTION_USER_TYPING = `
  subscription OnUserTyping($conversationId: ID) {
    userTyping(conversationId: $conversationId) {
      userId
      username
      conversationId
      isTyping
    }
  }
`

const SET_TYPING = `
  mutation SetTyping($conversationId: ID!, $isTyping: Boolean!) {
    setTyping(conversationId: $conversationId, isTyping: $isTyping)
  }
`

const DELETE_DIALOG = `
  mutation DeleteDialog($dialogId: ID!) {
    deleteDialog(dialogId: $dialogId)
  }
`

const SUBSCRIPTION_DIALOG_DELETED = `
  subscription OnDialogDeleted {
    dialogDeleted {
      dialogId
    }
  }
`

type dialogsType = Array<userDialogType>

export const messagesApi = createApi({
  reducerPath: 'graphqlMessagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/graphql',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      const token = getToken()
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
      transformResponse: (res: any) => {
        if (res?.errors) {
          console.error('getAllDialogs graphql errors:', res.errors)
          return [] as dialogsType
        }
        return (res?.data?.dialogs ?? []) as dialogsType
      },
      providesTags: [{ type: 'Messages', id: 'LIST' }],

      // Real-time: push incoming messages via WebSocket subscription
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          await cacheDataLoaded
        } catch {
          return
        }

        let unsubMessage: (() => void) | undefined
        let unsubDelete: (() => void) | undefined
        let unsubDialog: (() => void) | undefined
        let unsubDialogDeleted: (() => void) | undefined

        try {
          // Subscribe to new messages
          unsubMessage = wsClient.subscribe(
            { query: SUBSCRIPTION_MESSAGE_SENT },
            {
              next: ({ data }: any) => {
                const newMsg = data?.messageSent
                if (!newMsg) return
                updateCachedData((draft: any[]) => {
                  const dialog = draft.find((d: any) => d.id === newMsg.conversationId)
                  if (dialog) {
                    const alreadyExists = dialog.messages.some((m: any) => m.id === newMsg.id)
                    if (!alreadyExists) {
                      dialog.messages.push(newMsg)
                      dialog.updatedAt = newMsg.createdAt
                    }
                  } else {
                    dispatch(messagesApi.util.invalidateTags([{ type: 'Messages', id: 'LIST' }]))
                  }
                })
              },
              error: (err: any) => console.error('WS messageSent error:', err),
              complete: () => {}
            }
          )

          // Subscribe to message deletions
          unsubDelete = wsClient.subscribe(
            { query: SUBSCRIPTION_MESSAGE_DELETED },
            {
              next: ({ data }: any) => {
                const deleted = data?.messageDeleted
                if (!deleted) return
                updateCachedData((draft: any[]) => {
                  const dialog = draft.find((d: any) => d.id === deleted.conversationId)
                  if (dialog) {
                    dialog.messages = dialog.messages.filter(
                      (m: any) => m.id !== deleted.messageId
                    )
                  }
                })
              },
              error: (err: any) => console.error('WS messageDeleted error:', err),
              complete: () => {}
            }
          )

          // Subscribe to new dialogs started by other users
          unsubDialog = wsClient.subscribe(
            { query: SUBSCRIPTION_DIALOG_STARTED },
            {
              next: ({ data }: any) => {
                const newDialog = data?.dialogStarted
                if (!newDialog) return
                updateCachedData((draft: any[]) => {
                  const exists = draft.some((d: any) => d.id === newDialog.id)
                  if (!exists) {
                    draft.push(newDialog)
                  }
                })
              },
              error: (err: any) => console.error('WS dialogStarted error:', err),
              complete: () => {}
            }
          )

          // Subscribe to dialog deletions
          unsubDialogDeleted = wsClient.subscribe(
            { query: SUBSCRIPTION_DIALOG_DELETED },
            {
              next: ({ data }: any) => {
                const deleted = data?.dialogDeleted
                if (!deleted) return
                updateCachedData((draft: any[]) => {
                  const idx = draft.findIndex((d: any) => d.id === deleted.dialogId)
                  if (idx !== -1) {
                    draft.splice(idx, 1)
                  }
                })
              },
              error: (err: any) => console.error('WS dialogDeleted error:', err),
              complete: () => {}
            }
          )
        } catch (e) {
          console.error('Failed to set up WS subscriptions', e)
        }

        await cacheEntryRemoved
        unsubMessage?.()
        unsubDelete?.()
        unsubDialog?.()
        unsubDialogDeleted?.()
      }
    }),

    startDialog: builder.mutation({
      query: (userId) => ({
        url: '',
        method: 'POST',
        body: { query: START_DIALOG, variables: { userId } }
      }),
      transformResponse: (res: any) => {
        if (res?.errors) {
          console.error('startDialog graphql errors:', res.errors)
          return null
        }
        return res.data.startDialog
      },
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
      // Optimistically insert the new dialog into cache so it's immediately selectable
      async onQueryStarted(_userId, { dispatch, queryFulfilled }) {
        try {
          const { data: newDialog } = await queryFulfilled
          if (newDialog) {
            dispatch(
              messagesApi.util.updateQueryData('getAllDialogs', {}, (draft: any[]) => {
                const exists = draft.some((d: any) => d.id === newDialog.id)
                if (!exists) {
                  draft.push(newDialog)
                }
              })
            )
          }
        } catch {
          // invalidatesTags will still trigger a refetch
        }
      }
    }),

    sendDialogMessages: builder.mutation({
      query: ({ conversationId, text, image }) => ({
        url: '',
        method: 'POST',
        body: { query: SEND_DIALOG_MESSAGE, variables: { conversationId, text: text || '', image } }
      }),
      transformResponse: (res: any) => {
        if (res?.errors) {
          console.error('sendDialogMessages graphql errors:', res.errors)
          return null
        }
        return res?.data?.sendMessage ?? null
      },
      // Optimistically update cache
      async onQueryStarted({ conversationId, text, image }, { dispatch, queryFulfilled }) {
        const tempId = `temp-${Date.now()}`
        // We patch the cache optimistically
        const patchResult = dispatch(
          messagesApi.util.updateQueryData('getAllDialogs', {}, (draft: any[]) => {
            const dialog = draft.find((d: any) => d.id === conversationId)
            if (dialog) {
              dialog.messages.push({
                id: tempId,
                text: text || '',
                image: image || null,
                createdAt: new Date().toISOString(),
                conversationId,
                sender: { id: '__optimistic__', username: '' },
                receiver: { id: '', username: '' }
              })
            }
          })
        )
        try {
          const { data } = await queryFulfilled
          // Replace temp message with real one.
          // Guard: the subscription may have already delivered the real message.
          if (!data) {
            // GraphQL returned errors — remove the temp message
            patchResult.undo()
            return
          }
          dispatch(
            messagesApi.util.updateQueryData('getAllDialogs', {}, (draft: any[]) => {
              const dialog = draft.find((d: any) => d.id === conversationId)
              if (dialog) {
                const realAlreadyExists = dialog.messages.some((m: any) => m.id === data.id)
                if (realAlreadyExists) {
                  // Subscription beat us — just drop the temp placeholder
                  dialog.messages = dialog.messages.filter((m: any) => m.id !== tempId)
                } else {
                  const idx = dialog.messages.findIndex((m: any) => m.id === tempId)
                  if (idx !== -1) dialog.messages[idx] = data
                }
              }
            })
          )
        } catch {
          patchResult.undo()
        }
      }
    }),

    deleteMessage: builder.mutation({
      query: ({ messageId }) => ({
        url: '',
        method: 'POST',
        body: { query: DELETE_MESSAGE, variables: { messageId } }
      }),
      transformResponse: (res: any) => {
        if (res?.errors) {
          console.error('deleteMessage graphql errors:', res.errors)
          return false
        }
        return res?.data?.deleteMessage ?? false
      },
      async onQueryStarted({ messageId, conversationId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          messagesApi.util.updateQueryData('getAllDialogs', {}, (draft: any[]) => {
            const dialog = draft.find((d: any) => d.id === conversationId)
            if (dialog) {
              dialog.messages = dialog.messages.filter((m: any) => m.id !== messageId)
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),

    setTyping: builder.mutation({
      query: ({ conversationId, isTyping }) => ({
        url: '',
        method: 'POST',
        body: { query: SET_TYPING, variables: { conversationId, isTyping } }
      }),
      transformResponse: (res: any) => {
        if (res?.errors) {
          console.error('setTyping graphql errors:', res.errors)
          return false
        }
        return res?.data?.setTyping ?? false
      }
    }),

    deleteDialog: builder.mutation({
      query: ({ dialogId }) => ({
        url: '',
        method: 'POST',
        body: { query: DELETE_DIALOG, variables: { dialogId } }
      }),
      transformResponse: (res: any) => {
        if (res?.errors) {
          console.error('deleteDialog graphql errors:', res.errors)
          return false
        }
        return res?.data?.deleteDialog ?? false
      },
      async onQueryStarted({ dialogId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          messagesApi.util.updateQueryData('getAllDialogs', {}, (draft: any[]) => {
            const idx = draft.findIndex((d: any) => d.id === dialogId)
            if (idx !== -1) {
              draft.splice(idx, 1)
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    })
  })
})

export const {
  useGetAllDialogsQuery,
  useStartDialogMutation,
  useSendDialogMessagesMutation,
  useDeleteMessageMutation,
  useSetTypingMutation,
  useDeleteDialogMutation
} = messagesApi

// ===== Typing status hook using raw WebSocket subscription =====

type TypingState = {
  userId: string
  username: string
  conversationId: string
  isTyping: boolean
}

export function useTypingSubscription(conversationId: string | undefined) {
  const [typingUsers, setTypingUsers] = useState<TypingState[]>([])
  const timeoutsRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  useEffect(() => {
    if (!conversationId) return

    let unsubscribe: (() => void) | undefined

    try {
      unsubscribe = wsClient.subscribe(
        {
          query: SUBSCRIPTION_USER_TYPING,
          variables: { conversationId }
        },
        {
          next: ({ data }: any) => {
            const typing = data?.userTyping
            if (!typing) return

            if (typing.isTyping) {
              setTypingUsers((prev: TypingState[]) => {
                const exists = prev.some((t: TypingState) => t.userId === typing.userId)
                if (exists) return prev
                return [...prev, typing]
              })

              // Auto-clear after 4 seconds (fallback if stop event is missed)
              if (timeoutsRef.current[typing.userId]) {
                clearTimeout(timeoutsRef.current[typing.userId])
              }
              timeoutsRef.current[typing.userId] = setTimeout(() => {
                setTypingUsers((prev: TypingState[]) =>
                  prev.filter((t: TypingState) => t.userId !== typing.userId)
                )
                delete timeoutsRef.current[typing.userId]
              }, 4000)
            } else {
              setTypingUsers((prev: TypingState[]) =>
                prev.filter((t: TypingState) => t.userId !== typing.userId)
              )
              if (timeoutsRef.current[typing.userId]) {
                clearTimeout(timeoutsRef.current[typing.userId])
                delete timeoutsRef.current[typing.userId]
              }
            }
          },
          error: (err: any) => console.error('WS userTyping error:', err),
          complete: () => {}
        }
      )
    } catch (e) {
      console.error('Failed to subscribe to userTyping', e)
    }

    return () => {
      unsubscribe?.()
      Object.values(timeoutsRef.current).forEach(clearTimeout)
      timeoutsRef.current = {}
      setTypingUsers([])
    }
  }, [conversationId])

  return typingUsers
}