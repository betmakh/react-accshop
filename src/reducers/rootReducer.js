import { combineReducers } from 'redux';

import entitiesReducer from './entitiesReducer.js';
import pagesReducer from './pagesReducer.js';
import { pages } from '../constants/constants.js';

export default combineReducers({
	entities: entitiesReducer,
	pages: pagesReducer
});
