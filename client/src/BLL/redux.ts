import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import reducerAuth from './reducer-auth'
import reducerProfile from "./reducer-profile"
import reducerMessages from "./reducer-messages"
import reducerNews from "./reducer-news"
import reducerMusic from "./reducer-music"
import reducerFriends from "./reducer-friends"
import reducerFooter from "./reducer-footer"
import thunkMiddleWare from 'redux-thunk'
import reducerApp from "./reducer-app"
import reducerSidebar from "./reducer-sidebar"
import reducerNotifications from "./reducer-notifications"

const rootReducer = combineReducers ({
    auth: reducerAuth,
    profilePage: reducerProfile,
    messagesPage: reducerMessages,
    newsPage: reducerNews,
    musicPage: reducerMusic,
    notifications: reducerNotifications,
    Friends: reducerFriends,
    Sidebar: reducerSidebar,
    Footer: reducerFooter, 
    app: reducerApp
})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))

// @ts-ignore
window.store = store

type RootReducerType = typeof rootReducer
export type RootState = ReturnType<RootReducerType>

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

export default store