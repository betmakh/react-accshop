import {
  AUTH_ACCOUNT
} from '../actions/utilsActions.js';

const AccountActionsMap = {

  [FETCH_ACCOUNT_SUCCESS]: function(state, action) {
    if (!action.id && action.data.length) {
      let dataReduced = action.data.reduce((res, acc) => {
        res[acc._id] = acc;
        return res;
      }, {});
      state = Object.assign({}, state, dataReduced);
      // state = state.merge(dataReduced);
    } else if (action.id) {
      state = Object.assign({}, state, { [action.id]: action.data });
      // state = state.merge({
      //   [action.id]: action.data
      // });
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
  // return state.merge({
  //   tanks: TanksActionsMap[action.type] ? TanksActionsMap[action.type](state.get('tanks'), action) : state.get('tanks'),
  //   accounts: AccountActionsMap[action.type]
  //     ? AccountActionsMap[action.type](state.get('accounts'), action)
  //     : state.get('accounts')
  // });
}
