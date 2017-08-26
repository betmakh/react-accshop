import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import _ from 'lodash';

import { fetchAccountForPage, fetchTanksData } from '../../actions/entitiesActions.js';
import AccountDetails from '../AccountDetails.jsx';
import Loader from '../Loader.jsx';
import { pages } from '../../constants/constants.js';

const pageType = pages.accountInfo;

class AccountContainer extends Component {
  componentWillMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchAccountForPage(match.params.id, pageType));
  }

  render() {
    const { account, pageData, dispatch, tanks } = this.props;
    var tanksFiltered = [],
      tanksJS = _.values(tanks.toJS());

    if (account && account.get('tanks').size && tanksJS.length) {
      let tanksIDforAcc = account.get('tanks').toJS();
      tanksFiltered = tanksJS.reduce(
        (res, tank) => (~tanksIDforAcc.indexOf(tank.tank_id.toString()) ? res.push(tank) && res : res),
        []
      );
    }

    var accsElemetsList = [],
      renderData =
        pageData.get('fetching') || !account
          ? <Loader />
          : <AccountDetails tanks={tanksFiltered} account={account.toJS()} />;

    return renderData;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pageData: state.getIn(['pages', pageType]),
    account: state.getIn(['entities', 'accounts', ownProps.match.params.id]),
    tanks: state.getIn(['entities', 'tanks'])
  };
}

export default connect(mapStateToProps)(AccountContainer);
