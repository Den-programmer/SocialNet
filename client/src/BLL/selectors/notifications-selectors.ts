import { RootState } from "../redux"

export const selectNotifications = (state: RootState) => {
    return state.notifications.notifications
}

export const selectMainCheckboxStatus = (state: RootState) => {
    return state.notifications.isMainCheckboxActive
}

export const selectIsDeletingLoading = (state: RootState) => {
    return state.notifications.isDeletingLoading
}