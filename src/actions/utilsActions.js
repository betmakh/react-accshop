import queryString from 'queryString';
import fetch from 'isomorphic-fetch';

import { urls, keys } from '../constants/constants.js';

export const AUTH_ACCOUNT = 'AUTH_ACCOUNT';

// export const authAccount = (redirectUrl) => {
//     return dispatch => {
//         return fetch(
//                 `${urls.wotLogin}?` +
//                 queryString.stringify({
//                     redirect_uri: redirectUrl,
//                     application_id: keys.wotAppId,
//                     nofollow: 1
//                 })).then(resp => resp.json(), err => console.warn(err))
//             .then(authData => {
//                 console.log("authData", authData);
//             	window.location.href = authData.data.location;
//             });
//     }

// };