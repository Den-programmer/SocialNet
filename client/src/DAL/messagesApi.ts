import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from './api'
import { socketService } from './socket'
import { MessageType, userDialogType } from '../types/MessagesTypes/messagesTypes'

type DialogsResponse = ServerResType<{ dialogs: userDialogType[] }>
type DialogResponse = ServerResType<{ dialog: userDialogType }>
type MessageResponse = ServerResType<{ newMessage: MessageType }>
type DeletedMessageResponse = ServerResType<{ message: MessageType }>
type DeletedDialogSummary = {
  id: string
  participants: string[]
}
type DeletedDialogResponse = ServerResType<{ dialog: DeletedDialogSummary }>
type ConversationMessagesResponse = ServerResType<{
  messages?: MessageType[]
  items?: MessageType[]
  totalCount?: number
}>

type DialogsCache = userDialogType[]

const sortDialogsByRecentActivity = (dialogs: DialogsCache) => {
  dialogs.sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())
}

const sortMessagesByCreatedAt = (messages: MessageType[]) => {
  messages.sort((left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime())
}

const upsertDialog = (draft: DialogsCache, incomingDialog: userDialogType) => {
  const existingDialog = draft.find((dialog) => dialog.id === incomingDialog.id)

  if (!existingDialog) {
    draft.push({
      ...incomingDialog,
      messages: Array.isArray(incomingDialog.messages) ? [...incomingDialog.messages] : []
    })
    sortDialogsByRecentActivity(draft)
    return
  }

  existingDialog.updatedAt = incomingDialog.updatedAt || existingDialog.updatedAt
  existingDialog.participants = incomingDialog.participants?.length
    ? incomingDialog.participants
    : existingDialog.participants
  existingDialog.isActive = incomingDialog.isActive ?? existingDialog.isActive
  existingDialog.hasNewMessages = incomingDialog.hasNewMessages ?? existingDialog.hasNewMessages
  existingDialog.newMessagesCount = incomingDialog.newMessagesCount ?? existingDialog.newMessagesCount
  existingDialog.userName = incomingDialog.userName || existingDialog.userName
  existingDialog.photos = incomingDialog.photos || existingDialog.photos
  existingDialog.lastMessage = incomingDialog.lastMessage || existingDialog.lastMessage

  if (Array.isArray(incomingDialog.messages) && incomingDialog.messages.length > 0) {
    const messageIds = new Set(existingDialog.messages.map((message) => message.id))
    incomingDialog.messages.forEach((message) => {
      if (!messageIds.has(message.id)) {
        existingDialog.messages.push(message)
      }
    })
    sortMessagesByCreatedAt(existingDialog.messages)
  }

  sortDialogsByRecentActivity(draft)
}

const addMessageToDialog = (draft: DialogsCache, message: MessageType) => {
  const existingDialog = draft.find((dialog) => dialog.id === message.conversationId)

  if (!existingDialog) {
    draft.push({
      id: message.conversationId,
      updatedAt: message.createdAt,
      participants: [message.sender, message.receiver].filter(Boolean) as userDialogType['participants'],
      messages: [message]
    })
    sortDialogsByRecentActivity(draft)
    return
  }

  const existingIndex = existingDialog.messages.findIndex((draftMessage) => draftMessage.id === message.id)
  if (existingIndex === -1) {
    existingDialog.messages.push(message)
  } else {
    existingDialog.messages[existingIndex] = message
  }

  sortMessagesByCreatedAt(existingDialog.messages)
  existingDialog.updatedAt = message.createdAt
  sortDialogsByRecentActivity(draft)
}

const removeMessageFromDialog = (draft: DialogsCache, conversationId: string, messageId: string) => {
  const existingDialog = draft.find((dialog) => dialog.id === conversationId)
  if (!existingDialog) return

  existingDialog.messages = existingDialog.messages.filter((message) => message.id !== messageId)
}

const removeDialog = (draft: DialogsCache, dialogId: string) => {
  const dialogIndex = draft.findIndex((dialog) => dialog.id === dialogId)
  if (dialogIndex !== -1) {
    draft.splice(dialogIndex, 1)
  }
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getAllDialogs: builder.query<userDialogType[], void>({
      query: () => 'api/dialogs/getAllDialogs',
      transformResponse: (response: DialogsResponse) => response.data.dialogs ?? [],
      providesTags: () => [{ type: 'Messages', id: 'LIST' }],
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded
        } catch {
          return
        }

        const detachSocketListeners: Array<() => void> = []

        const addSocketListeners = () => {
          const socket = socketService.socket
          if (!socket) return

          const handleMessage = (message: MessageType) => {
            updateCachedData((draft) => {
              addMessageToDialog(draft, message)
            })
          }

          const handleMessageDeleted = (payload: { messageId?: string; conversationId?: string }) => {
            if (!payload.messageId || !payload.conversationId) return

            updateCachedData((draft) => {
              removeMessageFromDialog(draft, payload.conversationId || '', payload.messageId || '')
            })
          }

          const handleDialogStarted = (dialog: userDialogType) => {
            if (!dialog) return

            updateCachedData((draft) => {
              upsertDialog(draft, dialog)
            })
          }

          const handleDialogDeleted = (payload: { dialogId?: string }) => {
            if (!payload.dialogId) return

            updateCachedData((draft) => {
              removeDialog(draft, payload.dialogId || '')
            })
          }

          socket.on('getMessage', handleMessage)
          socket.on('messageDeleted', handleMessageDeleted)
          socket.on('dialogStarted', handleDialogStarted)
          socket.on('dialogDeleted', handleDialogDeleted)

          detachSocketListeners.push(() => socket.off('getMessage', handleMessage))
          detachSocketListeners.push(() => socket.off('messageDeleted', handleMessageDeleted))
          detachSocketListeners.push(() => socket.off('dialogStarted', handleDialogStarted))
          detachSocketListeners.push(() => socket.off('dialogDeleted', handleDialogDeleted))
        }

        const removeReadySubscription = socketService.onSocketAvailable(addSocketListeners)

        await cacheEntryRemoved
        removeReadySubscription()
        detachSocketListeners.forEach((cleanup) => cleanup())
      }
    }),

    startDialog: builder.mutation<userDialogType, string>({
      query: (userId) => ({
        url: `api/dialogs/addDialog/${userId}`,
        method: 'POST'
      }),
      transformResponse: (response: DialogResponse) => response.data.dialog,
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        try {
          const { data: dialog } = await queryFulfilled

          dispatch(
            messagesApi.util.updateQueryData('getAllDialogs', undefined, (draft: DialogsCache) => {
              upsertDialog(draft, dialog)
            })
          )

          socketService.socket?.emit('dialogStarted', {
            receiverId: userId,
            dialog
          })
        } catch {
          // The dialog list will refresh naturally if needed.
        }
      }
    }),

    sendDialogMessages: builder.mutation<MessageType, { conversationId: string; text: string; image?: string | null }>({
      query: ({ conversationId, text, image }) => ({
        url: `api/messages/addMessage/${conversationId}`,
        method: 'POST',
        body: { content: text, image }
      }),
      transformResponse: (response: MessageResponse) => response.data.newMessage,
      async onQueryStarted({ conversationId, text, image }, { dispatch, queryFulfilled }) {
        const tempId = `temp-${Date.now()}`
        const timestamp = new Date().toISOString()

        const patchResult = dispatch(
          messagesApi.util.updateQueryData('getAllDialogs', undefined, (draft: DialogsCache) => {
            const dialog = draft.find((item) => item.id === conversationId)
            if (!dialog) return

            dialog.messages.push({
              id: tempId,
              text,
              image: image || null,
              createdAt: timestamp,
              conversationId,
              sender: { id: '__optimistic__', username: '', photos: { small: '', large: '' } },
              receiver: { id: '', username: '', photos: { small: '', large: '' } }
            })
            dialog.updatedAt = timestamp
            sortMessagesByCreatedAt(dialog.messages)
            sortDialogsByRecentActivity(draft)
          })
        )

        try {
          const { data: message } = await queryFulfilled

          dispatch(
            messagesApi.util.updateQueryData('getAllDialogs', undefined, (draft: DialogsCache) => {
              const dialog = draft.find((item) => item.id === conversationId)
              if (!dialog) return

              dialog.updatedAt = message.createdAt

              const tempIndex = dialog.messages.findIndex((draftMessage) => draftMessage.id === tempId)
              const existingIndex = dialog.messages.findIndex((draftMessage) => draftMessage.id === message.id)

              if (existingIndex !== -1) {
                dialog.messages[existingIndex] = message
              } else if (tempIndex !== -1) {
                dialog.messages[tempIndex] = message
              } else {
                dialog.messages.push(message)
              }

              sortMessagesByCreatedAt(dialog.messages)
              sortDialogsByRecentActivity(draft)
            })
          )

          socketService.socket?.emit('sendMessage', {
            ...message,
            receiverId: message.receiver?.id
          })
        } catch {
          patchResult.undo()
        }
      }
    }),

    deleteMessage: builder.mutation<MessageType, { messageId: string; conversationId: string }>({
      query: ({ messageId }) => ({
        url: `api/messages/deleteMessage/${messageId}`,
        method: 'DELETE'
      }),
      transformResponse: (response: DeletedMessageResponse) => response.data.message,
      async onQueryStarted({ messageId, conversationId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          messagesApi.util.updateQueryData('getAllDialogs', undefined, (draft: DialogsCache) => {
            removeMessageFromDialog(draft, conversationId, messageId)
          })
        )

        try {
          const { data: message } = await queryFulfilled
          socketService.socket?.emit('messageDeleted', {
            messageId: message.id,
            conversationId,
            receiverId: message.receiver?.id
          })
        } catch {
          patchResult.undo()
        }
      }
    }),

    deleteDialog: builder.mutation<DeletedDialogSummary, { dialogId: string }>({
      query: ({ dialogId }) => ({
        url: 'api/dialogs/deleteDialog',
        method: 'DELETE',
        body: { dialogId }
      }),
      transformResponse: (response: DeletedDialogResponse) => response.data.dialog,
      async onQueryStarted({ dialogId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          messagesApi.util.updateQueryData('getAllDialogs', undefined, (draft: DialogsCache) => {
            removeDialog(draft, dialogId)
          })
        )

        try {
          const { data: dialog } = await queryFulfilled

          dialog.participants.forEach((participantId) => {
            socketService.socket?.emit('dialogDeleted', {
              receiverId: participantId,
              dialogId: dialog.id
            })
          })
        } catch {
          patchResult.undo()
        }
      }
    }),

    getDialogMessages: builder.query<MessageType[], { userId1: string; userId2: string }>({
      query: ({ userId1, userId2 }) => `api/messages/getMessagesBetweenUsers/${userId1}/${userId2}`,
      transformResponse: (response: ConversationMessagesResponse) =>
        response.data.messages ?? response.data.items ?? []
    })
  })
})

export const {
  useGetAllDialogsQuery,
  useStartDialogMutation,
  useSendDialogMessagesMutation,
  useDeleteMessageMutation,
  useDeleteDialogMutation,
  useGetDialogMessagesQuery
} = messagesApi
