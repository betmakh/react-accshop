import fetch from 'isomorphic-fetch';
import {urls} from '../constants/constants.js'; 

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
    console.log("data", data);
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

export function fetchAccount(id = '') {
    console.log("fetchid", id);
	return function(dispatch) {
		dispatch(fetchAccountStart(id));
		fetch(urls.account + id).then(resp => resp.json(), error => {
			dispatch(fetchAccountError(id, error));
		}).then(data => {
			dispatch(fetchAccountSuccess(id, data));
		console.log("data", data);
		});
	};
}