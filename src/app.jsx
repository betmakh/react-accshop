import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import MainPageContainer from './components/containers/MainPageContainer.jsx';
import AccountContainer from './components/containers/AccountContainer.jsx';

const App = () =>
	<Switch>
		<Route exact path="/" component={MainPageContainer} />
		<Route path="/account/:id" component={AccountContainer} />
	</Switch>;

export default App;
