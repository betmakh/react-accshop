import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { fetchAccount } from '../actions/actions.js'

var acc = ({account, click}) => {
	console.log("acc", account);

	return (<div onClick={() => click(account._id)}>{account.fetching ? 'fetching' : account.title}</div>)
}

const mapStateToProps = (state) => {
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
)(acc)

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


