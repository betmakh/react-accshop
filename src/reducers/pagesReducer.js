import {
	INVALIDATE_PAGE,
	START_PAGE_FETCHING,
	SUCCESS_PAGE_FETCHING,
	FAILURE_PAGE_FETCHING,
	FETCH_TANK_START
} from '../actions/pagesActions.js';
import { pages } from '../constants/constants.js';

const functionsMap = {
	[INVALIDATE_PAGE]: (state, action) => {
		state[action.pageType]['didInvalidate'] = true;
		return Object.assign({}, state);
		// return state.setIn([action.pageType, 'didInvalidate'], true);
	},
	[SUCCESS_PAGE_FETCHING]: (state, action) => {
		return Object.assign({}, state, {
			[action.pageType]: {
				fetching: false,
				didInvalidate: false,
				data: action.data
			}
		});
		// return state.merge({
		// 	[action.pageType]: {
		// 		fetching: false,
		// 		didInvalidate: false,
		// 		data: action.data
		// 	}
		// });
	},
	[START_PAGE_FETCHING]: (state, action) => {
		state[action.pageType]['fetching'] = true;
		return Object.assign({}, state);
		// return state.setIn([action.pageType, 'fetching'], true);
	},
	[FETCH_TANK_START]: (state, action) => {
		state[action.pageType]['tanksFetching'] = true;
		return Object.assign({}, state);
		// return state.setIn([action.pageTyp
		// return state.setIn([action.pageType, 'tanksFetching'], true);
	}
};

export default function(
	state = {
		[pages.mainPage]: {
			didInvalidate: false,
			fetching: false,
			data: []
		},
		[pages.accountInfo]: {
			fetching: false,
			tanksFetching: false,
			didInvalidate: false,
			data: null
		}
	},
	action
) {
	var fn = functionsMap[action.type];
	return fn ? fn(state, action) : state;
}
