import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducerAuth from './reducer-auth';
import reducerProfile from "./reducer-profile";
import reducerMessages from "./reducer-messages";
import reducerNews from "./reducer-news";
import reducerMusic from "./reducer-music";
import reducerFriends from "./reducer-friends";
import reducerFooter from "./reducer-footer";
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import reducerApp from "./reducer-app";
import reducerSidebar from "./reducer-sidebar";

let reducers = combineReducers ({
    auth: reducerAuth,
    profilePage: reducerProfile,
    messagesPage: reducerMessages,
    newsPage: reducerNews,
    musicPage: reducerMusic,
    Friends: reducerFriends,
    Sidebar: reducerSidebar,
    Footer: reducerFooter, 
    form: formReducer,
    app: reducerApp
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;