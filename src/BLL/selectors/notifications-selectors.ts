import { RootState } from "../redux"

export const getNotifications = (state: RootState) => {
    return state.notifications.notifications
}

export const getMainCheckboxStatus = (state: RootState) => {
    return state.notifications.isMainCheckboxAcvtive
}