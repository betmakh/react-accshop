// import ReactDOM from 'react-dom';
// import { Route, Switch } from 'react-router-dom';

import MainPageContainer from './components/containers/MainPageContainer.jsx';
import AccountContainer from './components/containers/AccountContainer.jsx';
// import App from './App.jsx';

const routes = [
  // component: App,
  {
    path: '/',
    exact: true,
    component: MainPageContainer
  },
  {
    path: '/account/:id',
    component: AccountContainer
  }
];

export default routes;
