import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_ERROR
} from '../actions/actions.js';

import { Map } from 'immutable';


const ActionsMap = {
  [FETCH_ACCOUNT_START]: function(state, action) {
    if (action.id) {
      state = state.setIn([action.id, 'fetching'], true)
    }
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
      console.log("state", state.toJS());
    console.log("actionSuccess", action);
    if (!action.id && action.data.length) {
      let datareduced = action.data.reduce((res, acc) => {
        res[acc._id] = acc;
        return res;
      }, {});
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

export default function(state, action) {
  state = Map.isMap(state) ? state : Map(state);
  var fn = ActionsMap[action.type];
  return fn ? state.merge({
    accounts: fn(state.get('accounts'), action)
  }) : state;

}