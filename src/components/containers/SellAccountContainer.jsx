import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'queryString';
import fetch from 'isomorphic-fetch';

import { urls, keys } from '../../constants/constants.js';
import { fetchAccountForPage, fetchTanksData } from '../../actions/entitiesActions.js';
// import { authAccount } from '../../actions/utilsActions.js';
import AccountEdit from '../AccountEdit.jsx';
import Loader from '../Loader.jsx';
import { pages } from '../../constants/constants.js';

const pageType = pages.accountInfo;

class SellAccountContainer extends Component {
	state = {
		accountAuthorized: false
	};

	componentWillMount() {
		const { dispatch, match } = this.props;
		var urlData = queryString.parse(window.location.search);
		if (urlData.status === 'ok') {
			this.setState({ accountAuthorized: true });
			this.fetchUserData(urlData);
			// dispatch(fetchTanksData(, pageType));
		}
	}

	fetchUserData(params) {
		fetch(
			`${urls.wotUserTanks}?` +
				queryString.stringify({
					application_id: keys.wotAppId,
					account_id: params.account_id
				})
		)
			.then(resp => resp.json(), err => console.warn(err))
			.then(userTanksData => {
				console.log('userTanksData', userTanksData);
			});

		fetch(
			urls.wotUserInfo +
				'?' +
				queryString.stringify({
					application_id: keys.wotAppId,
					account_id: params.account_id,
					access_token: params.access_token,
					fields:
						'private.gold, account_id, nickname, statistics.all.wins, statistics.all.battles, private.is_bound_to_phone, private.free_xp'
				})
		)
			.then(resp => resp.json(), err => console.warn(err))
			.then(userInfoData => {
				console.log('userInfoData', userInfoData);
			});
	}

	wotLogin() {
		fetch(
			`${urls.wotLogin}?` +
				queryString.stringify({
					redirect_uri: window.location.origin + window.location.pathname,
					application_id: keys.wotAppId,
					nofollow: 1
				})
		)
			.then(resp => resp.json(), err => console.warn(err))
			.then(authData => {
				console.log('authData', authData);
				window.location.href = authData.data.location;
			});
	}

	render() {
		const { dispatch, match } = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<AccountEdit onLogin={this.wotLogin} isAccountAuthorized={this.state.accountAuthorized} />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		pageData: state.pages[pageType],
		account: state.entities.accounts[ownProps.match.params.id],
		tanks: state.entities.tanks
	};
}

export default connect(mapStateToProps)(SellAccountContainer);
