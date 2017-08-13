const domain = '';
import keyMirror from 'keyMirror';

export const urls = {
	account: '/api/accounts/',
	tank: '//api.worldoftanks.ru/wot/encyclopedia/tankinfo/',
	tanksIdList: '//api.worldoftanks.ru/wot/account/tanks/'
};

export const keys = {
	wotAppId: '0a89f5fa1b360668940edb6889c76281'
};

export const pages = keyMirror({
	mainPage: null,
	accountInfo: null
});
