import fetch from 'isomorphic-fetch';
import { urls, keys } from '../constants/constants.js';
import { startPageFetching, pageFetchingSuccess, pageFetchingFail } from './pagesActions.js';
import queryString from 'queryString';
import { Promise } from 'es6-promise';

export const FETCH_ACCOUNT_START = 'FETCH_ACCOUNT_START';
export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
export const FETCH_ACCOUNT_ERROR = 'FETCH_ACCOUNT_ERROR';
// export const FETCH_TANK_START = 'FETCH_TANK_START';
export const FETCH_TANKS_SUCCESS = 'FETCH_TANKS_SUCCESS';

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

export const receiveTanksData = tanksData => {
	return {
		tanksData,
		type: FETCH_TANKS_SUCCESS
	};
};

export const fetchTanksData = ids => {
	return dispatch => {
		return fetch(
			`${urls.tank}?` +
				queryString.stringify({
					tank_id: ids.join(','),
					application_id: keys.wotAppId
				})
		)
			.then(resp => resp.json(), err => console.warn(err))
			.then(tanksData => dispatch(receiveTanksData(tanksData.data)));
	};
};

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

export const fetchAccountForPage = (id = '', pageType) => {
	return dispatch => {
		dispatch(startPageFetching(pageType));
		fetch(urls.account + id)
			.then(
				resp => resp.json(),
				error => {
					dispatch(pageFetchingFail(pageType, error));
				}
			)
			.then(data => {
				var pageData = id.length ? data._id : data.reduce((res, acc) => res.push(acc._id), []);
				dispatch(fetchAccountSuccess(id, data));
				dispatch(pageFetchingSuccess(pageType, pageData));
			});
	};
};
