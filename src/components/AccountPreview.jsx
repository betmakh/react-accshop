import React from 'react';

import Loader from './Loader.jsx';

class AccountPreview extends React.Component {
  render() {
    const { user, _id, title, description, price, fetching } = this.props.account;
    const clickCallback = this.props.click;

    let AccountMarkup = (<section className="box feature">
		  <a href="#" onClick={() => clickCallback(_id)} className="image featured"><img src="/public/images/pic01.jpg" alt=""/></a>
		  <div className="inner">
		    <header>
		      <h2>{title}</h2>
		      <p>{description}</p>
		    </header>
		    <ul>
		      <li>Price($): {price}</li>
		      <li>Reputation: </li>
		      <li>User: <a href={'/profile/' + (user && user.get('_id'))}>{user && user.get('name')}</a> </li>
		    </ul>
		    <a href="product/{_id}" className="button icon fa-arrow-circleP-right">Подробнее...</a>
		  </div>
		</section>);
    	
    return (<div>{fetching ? <Loader/> : AccountMarkup }</div> )
  }
}

export default AccountPreview;