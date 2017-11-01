import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import MainPageContainer from './components/containers/MainPageContainer.jsx';
import AccountContainer from './components/containers/AccountContainer.jsx';
import SellAccountContainer from './components/containers/SellAccountContainer.jsx';
import Header from './components/Header.jsx';

const App = () => (
	<div>
		<Header />
		<Switch>
			<Route exact path="/" component={MainPageContainer} />
			<Route path="/account/:id" component={AccountContainer} />
			<Route path="/sell" component={SellAccountContainer} />
		</Switch>
	</div>
);

export default App;
