import { createStore, combineReducers } from "redux";
import reducerAuth from './reducer-auth';
import reducerProfile from "./reducer-profile";
import reducerMessages from "./reducer-messages";
import reducerNews from "./reducer-news";
import reducerMusic from "./reducer-music";
import reducerOptions from "./reducer-options";
import reducerFriends from "./reducer-friends";
import reducerFooter from "./reducer-footer";

let reducers = combineReducers ({
    auth: reducerAuth,
    profilePage: reducerProfile,
    messagesPage: reducerMessages,
    newsPage: reducerNews,
    musicPage: reducerMusic,
    optionsPage: reducerOptions,
    Friends: reducerFriends,
    Footer: reducerFooter, 
});

let store = createStore(reducers);

export default store;