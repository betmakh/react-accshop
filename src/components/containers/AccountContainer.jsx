import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { fetchAccountIfNeeded } from '../../actions/actions.js';
import AccountDetails from '../AccountDetails.jsx';
import Loader from '../Loader.jsx';

class AccountContainer extends Component {
  // constructor(props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  //   this.handleRefreshClick = this.handleRefreshClick.bind(this)
  // }
  componentDidMount() {
    const { dispatch, match } = this.props;
    console.log('this.props', this.props);
    console.log('fetchAccountIfNeeded', match.params.id);
    dispatch(fetchAccountIfNeeded(match.params.id));
  }

  render() {
    const { account } = this.props;
    console.log('props acc container', this.props);
    var accsElemetsList = [],
      renderData = !account || account.get('fetching') ? <Loader /> : <AccountDetails account={account.toJS()} />;

    return renderData;
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
    account: state.getIn(['entities', 'accounts', ownProps.match.params.id])
  };
}

export default connect(mapStateToProps)(AccountContainer);
