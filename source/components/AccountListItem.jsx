import React from 'react';

export default class AccountListItem extends React.Component {

	render() {
		return (<h1>{this.props.account.title}</h1>);
	}

}