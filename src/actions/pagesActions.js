import fetch from 'isomorphic-fetch';
import { urls } from '../constants/constants.js';

export const INVALIDATE_PAGE = 'INVALIDATE_PAGE';
export const START_PAGE_FETCHING = 'START_PAGE_FETCHING';
export const SUCCESS_PAGE_FETCHING = 'SUCCESS_PAGE_FETCHING';
export const FAILURE_PAGE_FETCHING = 'FAILURE_PAGE_FETCHING';

export const didInvalidatePage = pageType => {
	return {
		type: INVALIDATE_PAGE,
		pageType
	};
};

export const startPageFetching = pageType => {
	return {
		type: START_PAGE_FETCHING,
		pageType
	};
};

export const pageFetchingSuccess = (pageType, data) => {
	return {
		type: SUCCESS_PAGE_FETCHING,
		pageType,
		data
	};
};

export const pageFetchingFail = (pageType, error) => {
	return {
		type: FAILURE_PAGE_FETCHING,
		pageType,
		error
	};
};
