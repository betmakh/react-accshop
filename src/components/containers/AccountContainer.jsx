import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { fetchAccountForPage, fetchTanksData } from '../../actions/entitiesActions.js';
import AccountDetails from '../AccountDetails.jsx';
import Loader from '../Loader.jsx';
import { pages } from '../../constants/constants.js';

const pageType = pages.accountInfo;

class AccountContainer extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchAccountForPage(match.params.id, pageType));
  }

  render() {
    const { account, pageData, dispatch } = this.props;
    if (account) {
      dispatch(fetchTanksData(account.get('tanks').toJS()));
    }
    var accsElemetsList = [],
      renderData = pageData.get('fetching') || !account ? <Loader /> : <AccountDetails account={account.toJS()} />;

    return renderData;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pageData: state.getIn(['pages', pageType]),
    account: state.getIn(['entities', 'accounts', ownProps.match.params.id])
  };
}

export default connect(mapStateToProps)(AccountContainer);
