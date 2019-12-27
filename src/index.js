import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import postReducer from './reducers/postReducer'


const store = createStore(postReducer, applyMiddleware(thunk))


ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>
, document.getElementById('root'));




