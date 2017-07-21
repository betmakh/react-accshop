import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "./reducers/rootReducer.js";
import { fetchAccount } from "./actions/actions.js";
import AccountComponent from "./components/AccountListItem.jsx";

const loggerMiddleware = createLogger();

let store = createStore(rootReducer, applyMiddleware(
  thunk, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
));
console.log("store", store.getState().toObject());
console.log("store", store.dispatch(fetchAccount('56ce5703634d17d06f28538a')));

ReactDOM.render( 
	<Provider store={store}>
	 	<AccountComponent />
  	</Provider>,
  document.getElementById('root'));

export default store;