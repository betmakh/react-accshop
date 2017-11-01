import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

// import App from './App.jsx';
import routes from './routes.js';
import store from './store.js';

const browserHistory = createBrowserHistory();

const renderApp = () => {
	render(
		<Provider store={store}>
			<BrowserRouter history={browserHistory}>
				{renderRoutes(routes)}
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);
};

export default renderApp;
