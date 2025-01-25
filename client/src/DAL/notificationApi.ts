import { instance } from './api'


export const NotificationsAPI = {
    getNotifications: () => {
        return instance.get(`api/notifications/getNotifications`).then(res => res.data)
    },

    addNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => {
        return instance.post(`api/notifications/addNotification`, { title, itemType, pageUrl }).then(res => res.data)
    },

    deleteNotification: (itemId: string) => {
        return instance.delete(`api/notifications/deleteNotification/${itemId}`).then(res => res.data);
    },
    updateIsCheckedStatus: (notificationId: string) => {
        return instance.put(`api/notifications/checkNotification/${notificationId}`).then(res => res.data);
    }
}