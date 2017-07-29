import fetch from 'isomorphic-fetch';
import { urls } from '../constants/constants.js';

export const FETCH_ACCOUNT_START = 'FETCH_ACCOUNT_START';
export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
export const FETCH_ACCOUNT_ERROR = 'FETCH_ACCOUNT_ERROR';

export function fetchAccountStart(id) {
	return {
		type: FETCH_ACCOUNT_START,
		id
	};
}
export function fetchAccountSuccess(id, data) {
	return {
		type: FETCH_ACCOUNT_SUCCESS,
		id,
		data
	};
}

export function fetchAccountError(id, error) {
	return {
		error,
		type: FETCH_ACCOUNT_ERROR,
		id
	};
}

var fetchFunction = function(dispatch, id) {
	dispatch(fetchAccountStart(id));
	fetch(urls.account + id)
		.then(
			resp => resp.json(),
			error => {
				dispatch(fetchAccountError(id, error));
			}
		)
		.then(data => {
			dispatch(fetchAccountSuccess(id, data));
		});
};

export function fetchAccount(id = '') {
	return dispatch => {
		fetchFunction(dispatch, id);
	};
}

export function fetchAccountIfNeeded(id = '') {
	return (dispatch, getState) => {
		if (id) {
			var state = getState();
			var acc = state.getIn(['entities', 'accounts', 'id']);
			if (!acc || !acc.get('fetching')) {
				fetchFunction(dispatch, id);
			}
		} else {
			fetchFunction(dispatch, id);
		}
	};
}
