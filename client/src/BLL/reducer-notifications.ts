import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notificationsApi } from '../DAL/notificationApi' 
import type { NotificationType } from '../DAL/notificationApi'

interface NotificationsState {
  notifications: NotificationType[]
  isMainCheckboxActive: boolean
  isDeletingLoading: boolean
}

const initialState: NotificationsState = {
  notifications: [],
  isMainCheckboxActive: false,
  isDeletingLoading: false
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleAllCheckedStatus(state, action: PayloadAction<boolean>) {
      state.notifications = state.notifications.map(n => ({
        ...n,
        isChecked: action.payload
      }))
      state.isMainCheckboxActive = action.payload
    },
    toggleNotificationChecked(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.map(n =>
        n._id === action.payload
          ? { ...n, isChecked: !n.isChecked }
          : n
      )
      state.isMainCheckboxActive = state.notifications.every(n => n.isChecked)
    },
    setDeletingLoading(state, action: PayloadAction<boolean>) {
      state.isDeletingLoading = action.payload
    }
  },
  extraReducers: builder => {
    // Når getNotifications lykkes:
    builder.addMatcher(
      notificationsApi.endpoints.getNotifications.matchFulfilled,
      (state, { payload }) => {
        state.notifications = payload
        // initial checkbox‐status:
        state.isMainCheckboxActive = payload.every(n => n.isChecked)
      }
    )
    // Når addNotification lykkes:
    builder.addMatcher(
      notificationsApi.endpoints.addNotification.matchFulfilled,
      (state, { payload }) => {
        state.notifications.push(payload)
      }
    )
    // Når deleteNotification starter:
    builder.addMatcher(
      notificationsApi.endpoints.deleteNotification.matchPending,
      state => {
        state.isDeletingLoading = true
      }
    )
    // Når deleteNotification lykkes:
    builder.addMatcher(
      notificationsApi.endpoints.deleteNotification.matchFulfilled,
      (state, { meta }) => {
        const deletedId = meta.arg.originalArgs
        state.notifications = state.notifications.filter(n => n._id !== deletedId)
        state.isDeletingLoading = false
      }
    )
    // Når deleteNotification fejler:
    builder.addMatcher(
      notificationsApi.endpoints.deleteNotification.matchRejected,
      state => {
        state.isDeletingLoading = false
      }
    )
    // Når updateIsCheckedStatus lykkes:
    builder.addMatcher(
      notificationsApi.endpoints.updateIsCheckedStatus.matchFulfilled,
      (state, { meta }) => {
        const toggledId = meta.arg.originalArgs
        state.notifications = state.notifications.map(n =>
          n._id === toggledId ? { ...n, isChecked: !n.isChecked } : n
        )
        state.isMainCheckboxActive = state.notifications.every(n => n.isChecked)
      }
    )
  }
})
 /// REfactor: Reducer‐logikken for at toggle checkbox‐status er spredt mellem to matchers (updateIsCheckedStatus og toggleNotificationChecked). Det kunne måske samles i én funktion for at undgå duplikering.
export const {
  toggleAllCheckedStatus,
  toggleNotificationChecked,
  setDeletingLoading
} = notificationsSlice.actions

export const notificationActions = notificationsSlice.actions
export default notificationsSlice.reducer