import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from './api'

export type NotificationType = {
  _id: string
  isChecked: boolean
  type: 'Profile' | 'Messages' | 'Friends' | 'News'
  author: string | null
  avatar: string | null
  title: string | null
  pageUrl: string | null
}

export type NotificationPayloadType = {
  title: string | null
  pageUrl: string | null
  itemType: 'Profile' | 'Messages' | 'Friends' | 'News'
  author?: string | null
  avatar?: string | null
}

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery,
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationType[], void>({
      query: () => `api/notifications/getNotifications`,
      transformResponse: (res: ServerResType<{ notifications: NotificationType[] }>) => res.data.notifications,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({
              type: 'Notification' as const,
              id: _id,
            })),
            { type: 'Notification', id: 'LIST' },
          ]
          : [{ type: 'Notification', id: 'LIST' }],
    }),
    addNotification: builder.mutation<NotificationType, NotificationPayloadType>({
      query: ({ title, pageUrl, itemType }) => ({
        url: `api/notifications/addNotification`,
        method: 'POST',
        body: { title, pageUrl, itemType },
      }),
      transformResponse: (res: ServerResType<{ newNotification: NotificationType }>) => res.data.newNotification,
      invalidatesTags: [{ type: 'Notification', id: 'LIST' }],
    }),

    deleteNotification: builder.mutation<string, string>({
      query: (itemId) => ({
        url: `api/notifications/deleteNotification/${itemId}`,
        method: 'DELETE',
      }),
      transformResponse: (res: ServerResType<{ notification: NotificationType}>) => res.data.notification._id,
      invalidatesTags: (result, error, arg) => [
        { type: 'Notification', id: arg },
        { type: 'Notification', id: 'LIST' },
      ],
    }),

    updateIsCheckedStatus: builder.mutation<NotificationType, string>({
      query: (notificationId) => ({
        url: `api/notifications/checkNotification/${notificationId}`,
        method: 'PUT',
      }),
      transformResponse: (res: ServerResType<{ notification: NotificationType }>) => res.data.notification,
      invalidatesTags: (result, error, arg) => [
        { type: 'Notification', id: arg },
      ],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useAddNotificationMutation,
  useDeleteNotificationMutation,
  useUpdateIsCheckedStatusMutation,
} = notificationsApi