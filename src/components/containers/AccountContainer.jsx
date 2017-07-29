import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { fetchAccount } from '../../actions/actions.js';
import AccountDetail from '../AccountDetail.jsx';
import Loader from '../Loader.jsx';

class AccountContainer extends Component {
  // constructor(props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  //   this.handleRefreshClick = this.handleRefreshClick.bind(this)
  // }
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchAccountIfNeeded(params.id));
  }

  render() {
    const { account } = this.props;
    console.log('accounts', accounts);
    var accsElemetsList = [],
      loader = <Loader />;

    return <AccountDetail account={account} />;
  }
}

// AccountContainer.propTypes = {
//   selectedSubreddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

function mapStateToProps(state, ownProps) {
  return {
    account: state.getIn(['entities', 'accounts', ownProps.id])
  };
}

export default connect(mapStateToProps)(AccountContainer);
