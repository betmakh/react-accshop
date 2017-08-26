import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer.js';
import thunk from 'redux-thunk';
import logger from './middleware/logger.js';

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk, // lets us dispatch() functions
		logger // neat middleware that logs actions
	)
);

export default store;
