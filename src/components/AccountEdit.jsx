import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TankPreview from './TankPreview.jsx';
import Loader from './Loader.jsx';

class AccountEdit extends Component {

	state = {
          title: '',
          price: '',
          description: '',
          tanks: '',
          is_with_email: false,
          is_bound_to_phone: false,
          wot_acc_id: '',
          // acc_id: Number(view.parameters.account_id),
          statistic: {}
	}

	constructor(props) {
		super(props);
		if (props.accountDataSaved) {
			this.state = props.accountDataSaved;  
		}
		this.saveAccount = this.saveAccount.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	onFieldChange(e) {
		if (e.target.type === 'radio' || e.target.type === 'checkbox') {
			this.setState({[e.target.name]: e.target.checked});
		} else {
			this.setState({[e.target.name]: e.target.value});
		} 
	}

	saveAccount(e) {
		console.log("this.state", this.state);
		// this.props.saveAccount(this.state);
	}

	render() {
		var {tanksList = [], onLogin, isAccountAuthorized=false, accountData, accountDataSaved} = this.props,
    		tanksMarkup = tanksList.length ? tanksList.map(tank => tank ? <TankPreview key={tank.tank_id} tank={tank} /> : '') : '';

	    var statistics = (accountDataSaved && accountDataSaved.statistics) || (accountData && {
	    	gold: accountData.private.gold,
	        free_xp: accountData.private.free_xp,
            win_rate: parseFloat(accountData.statistics.all.wins / accountData.statistics.all.battles * 100),
            battles: accountData.statistics.all.battles
	    })

		return (          
		<div>
            <h2>You</h2>
            <form name="account">
              <div className="row">
                <div className="col-xs-12 col-md-6">
                  <input type="text" name="title" onChange={this.onFieldChange} value={this.state.title} placeholder="Заголовок" />
                </div>
                <div className="col-xs-12 col-md-6">
                  <input type="text" name="price" onChange={this.onFieldChange} value={this.state.price} placeholder="price" />
                </div> 
                <div className="col-xs-12">
                  <label>
                    Продаю с email
                    <input type="checkbox" name="is_with_email" onChange={this.onFieldChange} checked={this.state.is_with_email}/>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <textarea name="description" onChange={this.onFieldChange} value={this.state.description} placeholder="Краткое описание"></textarea>
                </div>
              </div>  
              <br/>
              <div id="userInfo"></div>
              <div id="tanks">{tanksMarkup}</div>
              
              {statistics ? (<div className="col-xs-12">
              	<h3>Статистика</h3>
	            <table className="default">
	              <tbody>
	                <tr>
	                  <td>Боев</td>
	                  <td>
	                    {statistics.battles}
	                  </td>
	                </tr>
	                <tr>
	                  <td>Процент побед</td>
	                  <td>
	                    {statistics.win_rate}%
	                  </td>
	                </tr>
	                <tr>
	                  <td>Золото</td>
	                  <td>
	                    {statistics.gold}
	                  </td>
	                </tr>
	                <tr>
	                  <td>
	                    {' '}<span className="icon fa-star" /> Опыт
	                  </td>
	                  <td>
	                    {statistics.free_xp}
	                  </td>
	                </tr>
	              </tbody>
	            </table></div>) : ''}
              
              <br/>
              <button className="loginWot" type="button" onClick={onLogin}>{isAccountAuthorized ? 'Switch account' :  'Login to Wargaming'}</button>
              <br/>
              <br/>
              <button type="button" className="big icon fa-arrow-circle-right" onClick={this.saveAccount}>Продать</button>
            </form>
        </div>
            )
	}
}


export default AccountEdit;