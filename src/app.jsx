import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import MainPageContainer from './components/containers/MainPageContainer.jsx';
import AccountContainer from './components/containers/AccountContainer.jsx';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';
import logger from './middleware/logger.js';

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk, // lets us dispatch() functions
		logger // neat middleware that logs actions
	)
);

const App = () =>
	<Provider store={store}>
		<Switch>
			<Route exact path="/" component={MainPageContainer} />
			<Route path="/account/:id" component={AccountContainer} />
		</Switch>
	</Provider>;

export default App;
