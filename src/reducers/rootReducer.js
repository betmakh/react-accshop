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
})

const ActionsMap = {
    [FETCH_ACCOUNT_START]: function(state, action) {
        return state.mergeDeep({
            [action.id]: {
                fetching: true
            }
        })
    },
    [FETCH_ACCOUNT_ERROR]: function(state, action) {
        return state.merge(
            [action.id]: {
                fetching: false,
                error
            });
    },
    [FETCH_ACCOUNT_SUCCESS]: function(state, action) {
        return state.merge(
            [action.id]: {
                ...data,
                fetching: false
            })
    }
}

function accountsReducer(state = Map({}), action) {
    var fn = ActionsMap[action.type];
    return fn ? fn(state, action);
}

export default function(state = initialState, action) {
    return Map({
        entities: {
            accounts: accountsReducer(state.getIn(['entities', 'accounts']), action)
        }
    })
}
