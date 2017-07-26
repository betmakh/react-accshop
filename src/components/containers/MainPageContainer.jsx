import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Map} from 'immutable';


import { fetchAccount } from "../../actions/actions.js";
import AccountPreview from "../AccountPreview.jsx";

class MainPageContainer extends Component {
  // constructor(props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  //   this.handleRefreshClick = this.handleRefreshClick.bind(this)
  // }

  componentDidMount() {
    const { dispatch} = this.props;
    dispatch(fetchAccount())
  }

  render() {
    const { accounts } = this.props;
    var accsElemetsList = [];
    accounts.valueSeq().forEach(acc => accsElemetsList.push(<AccountPreview key={acc.get('_id')} account={acc.toJS()}/>))

    return (
      <div className="row" id="features-row">
        <div className="container">
          {accsElemetsList}        
        </div>
      </div>
    )
  }
}

// MainPageContainer.propTypes = {
//   selectedSubreddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

function mapStateToProps(state) {
  return {
    accounts: state.getIn(['entities', 'accounts'])
  }
}

export default connect(mapStateToProps)(MainPageContainer)