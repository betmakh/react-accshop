import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './store.js';

const browserHistory = createBrowserHistory();

const renderApp = () => {
	render(
		<Provider store={store}>
			<Router history={browserHistory}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Router>
		</Provider>,
		document.getElementById('root')
	);
};

export default renderApp;
