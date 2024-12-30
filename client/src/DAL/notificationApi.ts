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
    deleteCheckedNotifications: () => {
        return instance.delete(`api/notifications/deleteNotifications`).then(res => res.data);
    }
}