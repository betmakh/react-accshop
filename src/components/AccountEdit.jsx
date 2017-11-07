import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TankPreview from './TankPreview.jsx';
import Loader from './Loader.jsx';

const AccountEdit = ({tanksList = [], onLogin, isAccountAuthorized=false}) => {
    var greeting = "zdorov",description;

    var tanksMarkup = tanksList.length ? tanksList.map(tank => tank ? <TankPreview key={tank.tank_id} tank={tank} /> : '') : '';

	return (          
		<div>
            <h2>{greeting}</h2>
            <form name="account">
              <div className="row">
                <div className="col-xs-12 col-md-6">
                  <input type="text" name="title" placeholder="Заголовок"/>
                </div>
                <div className="col-xs-12 col-md-6">
                  <input type="text" name="price" placeholder="Цена($)"/>
                </div> 
                <div className="col-xs-12">
                  <label>
                    Продаю с email
                    <input type="checkbox" name="isWithEmail"/>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <textarea name="description" placeholder="Краткое описание">{description}</textarea>
                </div>
              </div>  
              <br/>
              <div id="userInfo"></div>
              <div id="tanks">{tanksMarkup}</div>
              <br/>
              <button className="loginWot" type="button" onClick={onLogin}>Login to Wargaming</button>
              <br/>
              <br/>
              <button id="proceed" className={"big icon fa-arrow-circle-right" + (isAccountAuthorized ? " disabled" : "")}>Продать</button>
            </form>
        </div>
            )
}

export default AccountEdit;