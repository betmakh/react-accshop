import { AUTH_ACCOUNT } from '../actions/utilsActions.js';

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

export default function(
  state = {
    account: {}
  },
  action
) {
  return {
    account: AccountActionsMap[action.type] ? AccountActionsMap[action.type](state.account, action) : state.account
  };
}
