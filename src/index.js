import * as serviceWorker from './serviceWorker';
import store from './BLL/redux'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {profilePage} from './BLL/reducer-profile';
import {messagesPage} from './BLL/reducer-messages';
import { Friends } from './BLL/reducer-friends'; 
import { Footer } from './BLL/reducer-footer';

let rerenderEntireTree = () => {
    ReactDOM.render(<App render={rerenderEntireTree}
        profilePage={profilePage}
        Messages={messagesPage.messages}
        footer={Footer}
        Friends={Friends}
        messagesPage={messagesPage}
        newMessageValue={messagesPage.NewMessageValue} 
        dispatch={store.dispatch.bind(store)}
        dialogsData={messagesPage.dialogsData} 
        posts={profilePage.posts}/>, 
        document.getElementById('root'));    
}
store.subscribe(rerenderEntireTree);

rerenderEntireTree();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
