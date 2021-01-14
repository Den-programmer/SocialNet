import { InferActionTypes } from './redux'


const entity = 'sn/notificationsPage/'

export type notificationType = {
  id: number
  isChecked: boolean
  type: 'Profile' | 'Messages' | 'Friends' | 'News'
  author?: string | null
  avatar?: string | null
  title: string | null
  pageUrl: string | null
}

type notificationsType = {
  notifications: Array<notificationType>
  isMainCheckboxAcvtive: boolean
}

const notificationsPage = {
  notifications: [],
  isMainCheckboxAcvtive: false
} as notificationsType

type ActionTypes = InferActionTypes<typeof actions>

const reducerNotifications = (state = notificationsPage, action: ActionTypes): notificationsType => {
  switch (action.type) {
    case `/sn/notificationsPage/ADD-NoTIFICATION`:
      const newNotification = {
        id: state.notifications.length + 1,
        isChecked: false,
        type: action.itemType,
        title: action.title,
        pageUrl: action.pageUrl ? action.pageUrl : null
      }
      return {
        ...state,
        notifications: [...state.notifications, newNotification]
      }
    case `/sn/notificationsPage/SET-NOTIFICATIONS-CHOSEN-STATUS`:
      return {
        ...state,
        notifications: state.notifications.map((item: notificationType) => {
          if (action.status) return { ...item, isChecked: true }
          return { ...item, isChecked: false }
        }),
        isMainCheckboxAcvtive: action.status
      }
    case `/sn/notificationsPage/SET-NOTIFICATIONS-STATUS`:
      let newNotifications = state.notifications.map((item: notificationType) => {
        if (item.id === action.itemId) return { ...item, isChecked: !item.isChecked }
        return item
      })
      return {
        ...state,
        notifications: newNotifications,
        isMainCheckboxAcvtive: newNotifications.every((item: notificationType) => item.isChecked !== true ? false : true)
      }
    case `/sn/notificationsPage/DELETE-NOTIFICATIONS`:
      return {
        ...state,
        notifications: state.notifications.filter((item: notificationType) => action.itemId !== item.id && true)
      }
    case `/sn/notificationsPage/DELETE-ALL-NOTIFICATIONS`:
      return {
        ...state,
        notifications: [],
        isMainCheckboxAcvtive: false
      }
    default:
      return state
  }
}

/* Action Creators! */

export const actions = {
  setNotificationsChosenStatus: (status: boolean) => ({ type: `/sn/notificationsPage/SET-NOTIFICATIONS-CHOSEN-STATUS`, status } as const),
  setNotificationStatus: (itemId: number) => ({ type: `/sn/notificationsPage/SET-NOTIFICATIONS-STATUS`, itemId } as const),
  deleteNotifications: (itemId: number) => ({ type: `/sn/notificationsPage/DELETE-NOTIFICATIONS`, itemId } as const),
  deleteAllNotifications: () => ({ type: `/sn/notificationsPage/DELETE-ALL-NOTIFICATIONS` } as const),
  addNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => ({ type: `/sn/notificationsPage/ADD-NoTIFICATION`, title, pageUrl, itemType } as const)
}

export default reducerNotifications