import fetch from 'isomorphic-fetch';
import { urls, keys } from '../constants/constants.js';
import { startPageFetching, pageFetchingSuccess, pageFetchingFail, startTanksFetching } from './pagesActions.js';
import queryString from 'queryString';
import { Promise } from 'es6-promise';

export const FETCH_ACCOUNT_START = 'FETCH_ACCOUNT_START';
export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
export const FETCH_ACCOUNT_ERROR = 'FETCH_ACCOUNT_ERROR';
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

export const fetchTanksData = (ids, pageType) => {
	return dispatch => {
		dispatch(startTanksFetching(pageType));
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
	return (dispatch, getState) => {
		dispatch(startPageFetching(pageType));
		fetch(urls.account + id)
			.then(
				resp => resp.json(),
				error => {
					dispatch(pageFetchingFail(pageType, error));
				}
			)
			.then(data => {
				// var data = {
				// 	_id: '57b41284dbf7e6480ad63a0b',
				// 	acc_id: 5570746,
				// 	is_bound_to_phone: false,
				// 	is_with_email: false,
				// 	price: 343,
				// 	user: {
				// 		_id: '56b0fb0db40568a69025b86f',
				// 		avatar: 'http://cs624024.vk.me/v624024971/4a890/g1OLNjSIeYM.jpg',
				// 		name: 'Nikita Betmanenko',
				// 		email: '6etmah@gmail.com',
				// 		__v: 0,
				// 		rating: 0,
				// 		liked: [],
				// 		ordersSell: [],
				// 		ordersBuy: [],
				// 		feedbacks: ['57b0aa48b0ba09882a26a5da'],
				// 		accounts: ['56b0fd0cb77deec690b17009', '57b41284dbf7e6480ad63a0b'],
				// 		is_email_confirmed: false
				// 	},
				// 	__v: 0,
				// 	updated: '2016-08-17T07:30:12.702Z',
				// 	description: 'da',
				// 	tanks: ['3841', '3329', '3089', '56577', '545'],
				// 	socials: [],
				// 	statistic: { gold: 300, free_xp: 311, win_rate: 40, battles: 5 },
				// 	likes: [],
				// 	title: 'adsads'
				// };

				var tanksFiltered = [],
					state = getState(),
					tanksJS = _.values(state.getIn(['entities', 'tanks']).toJS());

				let tanksIDforAcc = data.tanks;
				let tanksDiff = _.difference(tanksIDforAcc, tanksJS.map(tank => String(tank.tank_id)));
				tanksFiltered = tanksJS.reduce(
					(res, tank) => (!!~tanksIDforAcc.indexOf(tank.tank_id.toString()) ? res.push(tank) && res : res),
					[]
				);
				if (tanksDiff.length && !state.getIn(['pages', pageType]).get('tanksFetching')) {
					dispatch(fetchTanksData(tanksDiff, pageType));
				}
				var pageData = id.length ? data._id : data.reduce((res, acc) => res.push(acc._id), []);
				dispatch(fetchAccountSuccess(id, data));
				dispatch(pageFetchingSuccess(pageType, pageData));
			});
	};
};
