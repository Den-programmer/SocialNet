import * as serviceWorker from './serviceWorker';
import store from './BLL/redux'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

let state = store.getState();


ReactDOM.render(<Provider store={store}>
    <App footer={state.Footer}
        Friends={state.Friends} />
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
