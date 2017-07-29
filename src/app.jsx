import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Router, Route } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import MainPageContainer from './components/containers/MainPageContainer.jsx';
import AccountContainer from './components/containers/AccountContainer.jsx';

const browserHistory = createBrowserHistory();

const App = ({ store }) =>
	<Provider store={store}>
		<BrowserRouter history={browserHistory}>
			<Switch>
				<Route exact path="/" component={MainPageContainer} />
				<Route path="/account/:id" component={AccountContainer} />
			</Switch>
		</BrowserRouter>
	</Provider>;

export default App;
