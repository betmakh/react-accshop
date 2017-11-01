import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchAccountForPage, fetchTanksData } from '../../actions/entitiesActions.js';
import AccountDetails from '../AccountDetails.jsx';
import Loader from '../Loader.jsx';
import { pages } from '../../constants/constants.js';

const pageType = pages.accountInfo;

class AccountContainer extends Component {
  static fetchData(dispatch, id) {
    console.log('id', id);
    console.log('dispatch', dispatch);
    console.log('pageType', pageType);
    return dispatch(fetchAccountForPage(id, pageType));
  }

  componentWillMount() {
    const { dispatch, match } = this.props;
    this.constructor.fetchData(dispatch, match.params.id);
  }

  render() {
    const { account, pageData, dispatch, tanks } = this.props;
    var tanksFiltered = [],
      tanksJS = _.values(tanks);

    if (account && account.tanks.length && tanksJS.length) {
      let tanksIDforAcc = account.tanks;
      tanksFiltered = tanksJS.reduce(
        (res, tank) => (~tanksIDforAcc.indexOf(tank.tank_id.toString()) ? res.push(tank) && res : res),
        []
      );
    }

    var accsElemetsList = [],
      renderData =
        pageData.fetching || !account ? <Loader /> : <AccountDetails tanks={tanksFiltered} account={account} />;

    return renderData;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pageData: state.pages[pageType],
    account: state.entities.accounts[ownProps.match.params.id],
    tanks: state.entities.tanks
  };
}

export default connect(mapStateToProps)(AccountContainer);
