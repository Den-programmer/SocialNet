import { resultCode } from '../DAL/api'
import { NotificationsAPI } from '../DAL/notificationApi'
import { RootState, InferActionTypes } from './redux'
import { ThunkAction } from 'redux-thunk'

const entity = 'sn/notificationsPage/'

export type notificationType = {
  _id: string;
  isChecked: boolean;
  type: 'Profile' | 'Messages' | 'Friends' | 'News';
  author: string | null;
  avatar: string | null;
  title: string | null;
  pageUrl: string | null;
};

type notificationsType = {
  notifications: Array<notificationType>;
  isMainCheckboxAcvtive: boolean;
};

const notificationsPage = {
  notifications: [],
  isMainCheckboxAcvtive: false
} as notificationsType;

type ActionTypes = InferActionTypes<typeof actions>;

const reducerNotifications = (state = notificationsPage, action: ActionTypes): notificationsType => {
  switch (action.type) {
    case `/sn/notificationsPage/ADD-NOTIFICATION`:
      return {
        ...state,
        notifications: [...state.notifications, action.notification]
      };
    case `/sn/notificationsPage/SET-NOTIFICATIONS-CHOSEN-STATUS`:
      return {
        ...state,
        notifications: state.notifications.map((item: notificationType) => {
          if (action.status) return { ...item, isChecked: true };
          return { ...item, isChecked: false };
        }),
        isMainCheckboxAcvtive: action.status
      };
    case `/sn/notificationsPage/SET-NOTIFICATIONS-STATUS`:
      let newNotifications = state.notifications.map((item: notificationType) => {
        if (item._id === action.itemId) return { ...item, isChecked: !item.isChecked };
        return item;
      });
      return {
        ...state,
        notifications: newNotifications,
        isMainCheckboxAcvtive: newNotifications.every((item: notificationType) => item.isChecked !== true ? false : true)
      };
    case `/sn/notificationsPage/DELETE-NOTIFICATIONS`:
      return {
        ...state,
        notifications: state.notifications.filter((item: notificationType) => action.itemId !== item._id)
      };
    case `/sn/notificationsPage/DELETE-ALL-NOTIFICATIONS`:
      return {
        ...state,
        notifications: state.notifications.filter((notification: notificationType) => !notification.isChecked),
        isMainCheckboxAcvtive: false
      };
    case `/sn/notificationsPage/SET-NOTIFICATIONS`:
      return {
        ...state,
        notifications: action.notifications
      }
    default:
      return state;
  }
};

/* Action Creators! */

export const actions = {
  setNotificationsChosenStatus: (status: boolean) => ({ type: `/sn/notificationsPage/SET-NOTIFICATIONS-CHOSEN-STATUS`, status } as const),
  setNotificationStatus: (itemId: string) => ({ type: `/sn/notificationsPage/SET-NOTIFICATIONS-STATUS`, itemId } as const),
  deleteNotifications: (itemId: string) => ({ type: `/sn/notificationsPage/DELETE-NOTIFICATIONS`, itemId } as const),
  deleteAllNotifications: (notifications: notificationType[]) => ({ type: `/sn/notificationsPage/DELETE-ALL-NOTIFICATIONS`, notifications } as const),
  addNotification: (notification: notificationType) => ({ type: `/sn/notificationsPage/ADD-NOTIFICATION`, notification } as const),
  setNotifications: (notifications: Array<notificationType>) => ({ type: `/sn/notificationsPage/SET-NOTIFICATIONS`, notifications } as const)
};

/* Thunks! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionTypes>;

export const fetchNotifications = (): ThunkType => async (dispatch) => {
  try {
    const response = await NotificationsAPI.getNotifications();
    const data = response.data;
    dispatch(actions.setNotifications(data.notifications));
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

export const createNotification = (title: string | null, pageUrl: string | null, itemType: notificationType['type']): ThunkType => async (dispatch) => {
  try {
    const res = await NotificationsAPI.addNotification(title, pageUrl, itemType);
    if (res.resultCode === resultCode.Success) {
      dispatch(actions.addNotification(res.data.newNotification));
    } else {
      console.error('Failed to create notification:', res.statusText);
    }
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export const removeNotification = (itemId: string): ThunkType => async (dispatch) => {
  try {
    const res = await NotificationsAPI.deleteNotification(itemId);
    if (res.resultCode === resultCode.Success) {
      dispatch(actions.deleteNotifications(itemId));
    } else {
      console.error('Failed to delete notification:', res.statusText);
    }
  } catch (error) {
    console.error('Error deleting notification:', error);
  }
};

export const clearAllNotifications = (checkedNotificationIds: string[]): ThunkType => async (dispatch) => {
  try {
    for (let id of checkedNotificationIds) {
      dispatch(removeNotification(id));
    }
  } catch (error) {
    console.error('Error clearing checked notifications:', error);
  }
}

export const updateIsCheckedStatus = (notificationId: string): ThunkType => async (dispatch) => {
  try {
    const res = await NotificationsAPI.updateIsCheckedStatus(notificationId);
    if (res.resultCode === resultCode.Success) {
      const notification = res.data.notification;
      dispatch(actions.setNotificationStatus(notification._id));
    } else {
      console.error('Failed to update notification status:', res.statusText);
    }
  } catch (error) {
    console.error('Error updating notification status:', error);
  }
}

export default reducerNotifications