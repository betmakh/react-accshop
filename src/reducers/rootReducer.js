import { Map } from 'immutable';

import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_ERROR
} from '../actions/actions.js';


const initialState = Map({
  entities: {
    accounts: {}
  }
});

const ActionsMap = {
  [FETCH_ACCOUNT_START]: function(state, action) {
    if (action.id) {
      state = state.setIn([action.id, 'fetching'], true)
    } else {
      state = state.set('fetching', true);
    }
    console.log("state", state.toObject());
    return state;
  },
  [FETCH_ACCOUNT_ERROR]: function(state, action) {
    var updateObject = {
      fetching: false,
      error
    }
    if (action.id) {
      state = state.merge(updateObject)
    } else {
      state = state.merge({
        [action.id]: updateObject
      })
    }
    return state;
  },
  [FETCH_ACCOUNT_SUCCESS]: function(state, action) {
    console.log("actionSuccess", action);
    if (!action.id && action.data.length) {
        let datareduced = action.data.reduce((res, acc) => {
            res[acc._id] = acc;
            return res;
        }, {});
        console.log("datareduced", datareduced);
      state = state.merge(datareduced);
    } else {
      state = state.merge({
        [action.id]: {
          ...action.data,
          fetching: false
        }
      })
    }
    return state;
  }
}

function accountsReducer(state = Map({}), action) {
  var fn = ActionsMap[action.type];
  return fn ? fn(state, action) : state;

}

export default function(state = initialState, action) {
  return state.merge({
    entities: {
      accounts: accountsReducer(state.getIn(['entities', 'accounts']), action)
    }
  })
}