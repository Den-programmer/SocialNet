import { createStore, combineReducers, applyMiddleware } from "redux";
import reducerAuth from './reducer-auth';
import reducerProfile from "./reducer-profile";
import reducerMessages from "./reducer-messages";
import reducerNews from "./reducer-news";
import reducerMusic from "./reducer-music";
import reducerOptions from "./reducer-options";
import reducerFriends from "./reducer-friends";
import reducerFooter from "./reducer-footer";
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers ({
    auth: reducerAuth,
    profilePage: reducerProfile,
    messagesPage: reducerMessages,
    newsPage: reducerNews,
    musicPage: reducerMusic,
    optionsPage: reducerOptions,
    Friends: reducerFriends,
    Footer: reducerFooter, 
    form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;