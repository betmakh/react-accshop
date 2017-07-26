import React from 'react';
import App from "./app.jsx";
import { createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import rootReducer from "./reducers/rootReducer.js";
import logger from "./middleware/logger.js";

const store = createStore(rootReducer, applyMiddleware(
  thunk, // lets us dispatch() functions
  logger // neat middleware that logs actions
));

ReactDOM.render( 
	<App store={store}/>,
  document.getElementById('root'));