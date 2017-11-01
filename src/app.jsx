import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes.js';
import MainPageContainer from './components/containers/MainPageContainer.jsx';
import AccountContainer from './components/containers/AccountContainer.jsx';

const App = ({ route }) => {
	return <Switch>{renderRoutes(routes)}</Switch>;
};

export default App;
