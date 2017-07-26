import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { fetchAccount } from '../actions/actions.js'
import AccountComponent from './AccountPreview.jsx';

var acc = ({account, click}) => {
	console.log("acc", account);

	return (<div onClick={() => click(account._id)}>{account.fetching ? 'fetching' : account.title}</div>)
}

const mapStateToProps = (state) => {
    console.log("state", state.toObject());
    console.log("state", state.getIn(['entities']).toObject());
    console.log("stateAccs", state.getIn(['entities', 'accounts']).toObject());
  return {
    account: state.getIn(['entities', 'accounts', '56ce5703634d17d06f28538a']).toObject()

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: (id) => {
      dispatch(fetchAccount(id))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountComponent)

export default FilterLink;

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}


