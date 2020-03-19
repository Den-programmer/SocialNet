import * as serviceWorker from './serviceWorker';
import state from './BLL/state'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { addpost } from './BLL/state';
import {subscribe} from './BLL/state';

let rerenderEntireTree = () => {
    ReactDOM.render(<App render={rerenderEntireTree}
        addpost={addpost}
        state={state}
        dialogsData={state.messagesPage.dialogsData} 
        posts={state.profilePage.posts}/>, 
        document.getElementById('root'));    
}

subscribe(rerenderEntireTree);

rerenderEntireTree();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
