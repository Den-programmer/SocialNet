import * as serviceWorker from './serviceWorker';
import store from './BLL/state'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let rerenderEntireTree = () => {
    ReactDOM.render(<App render={rerenderEntireTree}
        addpost={store.addpost.bind(store)}
        state={store.getState()}
        dialogsData={store.getState().messagesPage.dialogsData} 
        posts={store.getState().profilePage.posts}/>, 
        document.getElementById('root'));    
}

store.subscribe(rerenderEntireTree);

rerenderEntireTree();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
