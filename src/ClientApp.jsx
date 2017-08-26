import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './store.js';

const browserHistory = createBrowserHistory();

const renderApp = () => {
	render(
		<Provider store={store}>
			<BrowserRouter history={browserHistory}>
				<App />
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);
};

export default renderApp;
