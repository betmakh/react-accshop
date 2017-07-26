import { Map } from 'immutable';

import entitiesReducer from './entitiesReducer.js';
import pagesReducer from './pagesReducer.js';


const initialState = Map({
  entities: {
    accounts: {}
  },
  pages: {
    mainPage: {
      fetching: false,
      accounts: []
    }
  }
});

export default function(state = initialState, action) {
    console.log("initioalState", Map.isMap(state.get('entities')));
  return state.merge({
    entities: entitiesReducer(state.get('entities'), action),
    pages: pagesReducer(state.get('pages'), action)
  })
}