import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'queryString';
import fetch from 'isomorphic-fetch';

import { urls, keys, pages } from '../../constants/constants.js';
import { fetchAccountForPage, fetchTanksData } from '../../actions/entitiesActions.js';
// import { authAccount } from '../../actions/utilsActions.js';
import AccountEdit from '../AccountEdit.jsx';
import Loader from '../Loader.jsx';

const pageType = pages.accountSell;

class SellAccountContainer extends Component {
	state = {
      accountAuthorized: false,
      urlData: null,
      userTanksData: []
	};

	componentWillMount() {
		const { dispatch, match } = this.props;
		var urlData = queryString.parse(window.location.search);
		if (urlData.status === 'ok') {
			this.setState({ accountAuthorized: true, urlData });
			this.fetchUserData(urlData);
			// dispatch(fetchTanksData(, pageType));
		}
	}

	fetchUserData(params = this.state.urlData) {
    const { dispatch, match } = this.props;
    var self = this;
		fetch(
			`${urls.wotUserTanks}?` +
				queryString.stringify({
					application_id: keys.wotAppId,
					account_id: params.account_id
				})
		)
			.then(resp => resp.json(), err => console.warn(err))
			.then(userTanksData => {
        if (userTanksData.status === 'ok') {
          self.setState({userTanksData : userTanksData.data[params.account_id]})
          dispatch(fetchTanksData(userTanksData.data[params.account_id].map(tank => tank.tank_id), pages.accountSell))
        }
				console.log('userTanksData', userTanksData);
			});

		fetch(
			`${urls.wotUserInfo}?` +
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
		const { dispatch, tanks, pageData } = this.props;
    var userTanksList = this.state.userTanksData.map(tank => tanks[tank.tank_id] ?  _.extend(tanks[tank.tank_id], tank) : null);

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						{pageData.fetching ? <Loader/> : <AccountEdit onLogin={this.wotLogin} isAccountAuthorized={this.state.accountAuthorized} authData={this.state.urlData} tanksList={userTanksList} />}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		tanks: state.entities.tanks,
    pageData: state.pages[pageType]
	};
}

export default connect(mapStateToProps)(SellAccountContainer);
