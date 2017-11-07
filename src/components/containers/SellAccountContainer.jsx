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
      accountTanksData: null,
      accountData: null
	};

	componentWillMount() {
		const { dispatch, match } = this.props;
		var urlData = queryString.parse(window.location.search);
		if (urlData.status === 'ok') {
			this.setState({ accountAuthorized: true, urlData });
			this.fetchAccountData(urlData);
			// dispatch(fetchTanksData(, pageType));
		}
	}

	fetchAccountData(params = this.state.urlData) {
    const { dispatch, match } = this.props;
    var self = this;

    // fetch tanks for selling accounts
		fetch(
			`${urls.wotUserTanks}?` +
				queryString.stringify({
					application_id: keys.wotAppId,
					account_id: params.account_id
				})
		)
			.then(resp => resp.json(), err => console.warn(err))
			.then(accountTanksData => {
        if (accountTanksData.status === 'ok') {
          self.setState({accountTanksData : accountTanksData.data[params.account_id]})
          dispatch(fetchTanksData(accountTanksData.data[params.account_id].map(tank => tank.tank_id), pages.accountSell))
        } else {
          self.setState({accountAuthorized: false, accountTanksData : null})
        }
			});

    // fetch statistics for selling accounts
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
			.then(accountData => {
        if (accountData.status === 'ok') {
          self.setState({accountAuthorized: true, accountData: accountData.data[params.account_id]})
        } else {
          self.setState({accountAuthorized: false, accountData: null })
        }

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
    var userTanksList = this.state.accountTanksData ? this.state.accountTanksData.map(tank => tanks[tank.tank_id] ?  _.extend(tanks[tank.tank_id], tank) : null) : '';

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						{pageData.fetching ? <Loader/> : <AccountEdit onLogin={this.wotLogin} isAccountAuthorized={this.state.accountAuthorized} accountData={this.state.accountData} authData={this.state.urlData} tanksList={userTanksList} />}
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
