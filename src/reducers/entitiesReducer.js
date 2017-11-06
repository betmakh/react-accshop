import {
  FETCH_ACCOUNT_START,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_ERROR,
  FETCH_TANKS_SUCCESS
} from '../actions/entitiesActions.js';

const AccountActionsMap = {
  [FETCH_ACCOUNT_SUCCESS]: function(state, action) {
    if (!action.id && action.data.length) {
      let dataReduced = action.data.reduce((res, acc) => {
        res[acc._id] = acc;
        return res;
      }, {});
      state = Object.assign({}, state, dataReduced);
    } else if (action.id) {
      state = Object.assign({}, state, { [action.id]: action.data });
    }
    return state;
  }
};

const TanksActionsMap = {
  [FETCH_TANKS_SUCCESS]: (state, action) => {
    if (action.tanksData) {
      state = Object.assign({}, state, action.tanksData);
    }
    return state;
  }
};

export default function(
  state = {
    accounts: {},
    tanks: {}
  },
  action
) {
  return {
    tanks: TanksActionsMap[action.type] ? TanksActionsMap[action.type](state.tanks, action) : state.tanks,
    accounts: AccountActionsMap[action.type] ? AccountActionsMap[action.type](state.accounts, action) : state.accounts
  };
}
