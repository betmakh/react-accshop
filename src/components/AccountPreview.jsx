import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loader from './Loader.jsx';

class AccountPreview extends React.Component {
	static propTypes = {
		account: PropTypes.shape({
			user: PropTypes.object.isRequired,
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			price: PropTypes.string.isRequired,
			fetching: PropTypes.bool
		}).isRequired
	};

	render() {
		const { user, _id, title, description, price, fetching } = this.props.account || {};
		const clickCallback = this.props.click;

		let AccountMarkup = (
			<div className="col-md-4">
				<section className="box feature">
					<a href="#" onClick={() => clickCallback(_id)} className="image featured">
						<img src="/public/images/pic01.jpg" alt="" />
					</a>
					<div className="inner">
						<header>
							<h2>
								{title}
							</h2>
							<p>
								{description}
							</p>
						</header>
						<ul>
							<li>
								Price($): {price}
							</li>
							<li>Reputation: </li>
							<li>
								User: <a href={'/profile/' + (user && user._id)}>{user && user.name}</a>{' '}
							</li>
						</ul>
						<Link to={`/account/${_id}`} className="button icon fa-arrow-circleP-right">
							Подробнее...
						</Link>
					</div>
				</section>
			</div>
		);

		return (
			<div>
				{fetching ? <Loader /> : AccountMarkup}
			</div>
		);
	}
}

export default AccountPreview;
