import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'
import {fetchPost}
import Picker from '../components/Picker'
import Posts from '../components/Posts'

import { fetchAccount } from "../../actions/actions.js";
import AccountPreview from "../AccountPreview.jsx";

class AsyncApp extends Component {
  // constructor(props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  //   this.handleRefreshClick = this.handleRefreshClick.bind(this)
  // }

  componentDidMount() {
    const { dispatch} = this.props
    dispatch(fetchAccount())
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div class="row" id="features-row">

      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)