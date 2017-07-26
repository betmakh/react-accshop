import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import MainPageContainer from "./components/containers/MainPageContainer.jsx";

const browserHistory = createBrowserHistory()

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainPageContainer} />
    </Router>
  </Provider>
)

export default App;