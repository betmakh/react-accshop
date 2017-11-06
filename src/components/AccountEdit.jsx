import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from './Loader.jsx';

const AccountEdit = (props) => {
    var greeting = "zdorov",description;

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
              <div id="tanks"></div>
              <br/>
              <button className="loginWot" type="button" onClick={props.onLogin}>Login to Wargaming</button>
              <br/>
              <br/>
              <button id="proceed" className={"big icon fa-arrow-circle-right" + (props.isAccountAuthorized ? " disabled" : "")}>Продать</button>
            </form>
        </div>
            )
}

export default AccountEdit;