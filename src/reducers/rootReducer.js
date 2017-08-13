import { fromJS } from 'immutable';

import entitiesReducer from './entitiesReducer.js';
import pagesReducer from './pagesReducer.js';
import { pages } from '../constants/constants.js';

const initialState = fromJS({
  entities: {
    accounts: {},
    tanks: {}
  },
  pages: {
    [pages.mainPage]: {
      didInvalidate: false,
      fetching: false,
      data: []
    },
    [pages.accountInfo]: {
      fetching: false,
      didInvalidate: false,
      data: null
    }
  }
});

export default function(state = initialState, action) {
  return state.merge({
    entities: entitiesReducer(state.get('entities'), action),
    pages: pagesReducer(state.get('pages'), action)
  });
}
