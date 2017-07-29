import { Map } from 'immutable';

import entitiesReducer from './entitiesReducer.js';
import pagesReducer from './pagesReducer.js';

const initialState = Map({
  entities: {
    accounts: Map({})
  },
  pages: {
    mainPage: {
      fetching: false,
      accounts: []
    },
    accountInfo: {
      fetching: false,
      accountId: null
    }
  }
});

export default function(state = initialState, action) {
  return state.merge({
    entities: entitiesReducer(state.get('entities'), action),
    pages: pagesReducer(state.get('pages'), action)
  });
}
