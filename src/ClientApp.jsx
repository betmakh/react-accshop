import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const browserHistory = createBrowserHistory();

const renderApp = () => {
	render(
		<BrowserRouter history={browserHistory}>
			<App />
		</BrowserRouter>,
		document.getElementById('root')
	);
};

export default renderApp;

