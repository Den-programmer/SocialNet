import * as serviceWorker from './serviceWorker';
import store from './BLL/redux'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let state = store.getState();

let rerenderEntireTree = () => {
    ReactDOM.render(<App profilePage={state.profilePage}
        footer={state.Footer}
        Friends={state.Friends}
        messagesPage={state.messagesPage} 
        dispatch={store.dispatch.bind(store)}/>, 
        document.getElementById('root'));    
}
store.subscribe(rerenderEntireTree);

rerenderEntireTree();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
