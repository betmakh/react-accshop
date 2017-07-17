import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "./reducers/rootReducer.js";

let store = createStore(rootReducer);

ReactDOM.render(<h1>hello</h1>,
  document.getElementById('root'));

export default store;