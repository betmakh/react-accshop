import {
	INVALIDATE_PAGE,
	START_PAGE_FETCHING,
	SUCCESS_PAGE_FETCHING,
	FAILURE_PAGE_FETCHING
} from '../actions/pagesActions.js';
import { pages } from '../constants/constants.js';

const functionsMap = {
	[INVALIDATE_PAGE]: (state, action) => {
		return state.setIn([action.pageType, 'didInvalidate'], true);
	},
	[SUCCESS_PAGE_FETCHING]: (state, action) => {
		return state.merge({
			[action.pageType]: {
				fetching: false,
				didInvalidate: false,
				data: action.data
			}
		});
	},
	[START_PAGE_FETCHING]: (state, action) => {
		console.log('state', state);
		return state.setIn([action.pageType, 'fetching'], true);
	}
};

export default function(state, action) {
	var fn = functionsMap[action.type];
	return fn ? fn(state, action) : state;
}
