import { InferActionTypes } from './redux'


const entity = 'sn/notificationsPage/'

export type notificationType = {
  id: number
  isChecked: boolean
  type: 'Profile' | 'Messages' | 'Friends' | 'News'
  title: string | null
  author: string | null
  avatar: string | File | null
  pageUrl: string | null
}

type notificationsType = {
  notifications: Array<notificationType>
  isMainCheckboxAcvtive: boolean
}

const notificationsPage = {
  notifications: [
    {
      id: 1,
      isChecked: false,
      type: 'Profile',
      title: 'Notication',
      author: null,
      avatar: null,
      pageUrl: '/Profile'
    }
  ],
  isMainCheckboxAcvtive: false
} as notificationsType

type ActionTypes = InferActionTypes<typeof actions>

const reducerNotifications = (state = notificationsPage, action: ActionTypes): notificationsType => {
  switch (action.type) {
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
  deleteAllNotifications: () => ({ type: `/sn/notificationsPage/DELETE-ALL-NOTIFICATIONS` } as const)
}

export default reducerNotifications