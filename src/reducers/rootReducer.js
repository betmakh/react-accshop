import { combineReducers } from 'redux';

import entitiesReducer from './entitiesReducer.js';
import pagesReducer from './pagesReducer.js';
import { pages } from '../constants/constants.js';

// export const initialState = {
//   entities: {
//     accounts: {},
//     tanks: {}
//   },
//   pages: {
//     [pages.mainPage]: {
//       didInvalidate: false,
//       fetching: false,
//       data: []
//     },
//     [pages.accountInfo]: {
//       fetching: false,
//       tanksFetching: false,
//       didInvalidate: false,
//       data: null
//     }
//   }
// };

export default combineReducers({
  entities: entitiesReducer,
  pages: pagesReducer
});

// export default function(state = initialState, action) {

//   return state.merge({
//     entities: entitiesReducer.entities, action),
//     pages: pagesReducer(state.get('pages'), action)
//   });
// }
