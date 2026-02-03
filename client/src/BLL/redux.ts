import { configureStore } from '@reduxjs/toolkit'
import reducerAuth from './reducer-auth'
import reducerProfile from './reducer-profile'
import reducerMessages from './reducer-messages'
import reducerNews from './reducer-news'
import reducerFriends from './reducer-friends'
import reducerFooter from './reducer-footer'
import reducerApp from './reducer-app'
import reducerSidebar from './reducer-sidebar'
import reducerNotifications from './reducer-notifications'
import { authApi } from '../DAL/authApi'
import { profileApi } from '../DAL/profileApi'
import { messagesApi } from '../DAL/messagesApi'
import { newsApi } from '../DAL/newsAPi'
import { notificationsApi } from '../DAL/notificationApi'
import { usersApi } from '../DAL/usersApi'
import { aiApi } from '../DAL/AI/aiAPI'

export const store = configureStore({
  reducer: {
    auth: reducerAuth,
    profilePage: reducerProfile,
    messagesPage: reducerMessages,
    newsPage: reducerNews,
    notifications: reducerNotifications,
    Friends: reducerFriends,
    Sidebar: reducerSidebar,
    Footer: reducerFooter,
    app: reducerApp,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer
  },  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(profileApi.middleware)
  .concat(authApi.middleware)
  .concat(messagesApi.middleware)
  .concat(newsApi.middleware)
  .concat(notificationsApi.middleware)
  .concat(usersApi.middleware)
  .concat(aiApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store