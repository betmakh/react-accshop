import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from './Loader.jsx';
import { fetchAccount } from '../actions/entitiesActions.js';
import TankPreview from './TankPreview.jsx';

const AccountDetails = ({ account = {}, tanks = [] }) => {
  const { title, price, user, description, is_bound_to_phone, is_with_email, acc_id, statistic } = account;

  return (
    <div id="content" className="account">
      <article>
        <div className="row">
          <div className="col-sm-4">
            <h2>{title}</h2>
            <h2 className="price">
              {price} <i className="icon fa-usd" />
            </h2>
            <a href="maito:{user.email}">
              Задать вопрос продавцу <i className="icon fa-question" />
            </a>
            <br />
            <b>Продавец: </b> <a href="/profile/{user._id}">{user.name}</a> <span className="icon fa-star"> 23</span>
            <br />
            <span className="like">
              Like <i className="icon fa-thumbs-up" />{' '}
            </span>
            <br />
            <div
              className="fb-like"
              data-href="{share_link}"
              data-layout="box_count"
              data-action="like"
              data-show-faces="true"
              data-share="true"
            />
            <div id="vk_like" />
            <br />
            <div id="ok_shareWidget" />
            <br />
            <button className="button big buy">Купить</button>
          </div>
          <div className="col-sm-8">
            <h3>Краткое описание</h3>
            <p>
              {description}
            </p>
            <div id="tanksList">
              {tanks.length
                ? <div className="row">
                    <div className="col-xs-12">
                      <h3>Ваши танки, товарищ</h3>
                    </div>
                    <div className="col-xs-12">
                      <div className="row" id="tanksList">
                        {tanks.map(tank => <TankPreview tank={tank} key={tank.tank_id}/> )}
                      </div>
                    </div>
                  </div>
                : Loader}
            </div>
            <h3>Информация про аккаунт</h3>
            <table className="default">
              <tbody>
                <tr>
                  <td>Привязан к телефону</td>
                  <td>
                    {is_bound_to_phone}
                  </td>
                </tr>
                <tr>
                  <td>Продается с email</td>
                  <td>
                    {is_with_email}
                  </td>
                </tr>
                <tr>
                  <td>Acc id</td>
                  <td>
                    {acc_id}
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Статистика</h3>
            <table className="default">
              <tbody>
                <tr>
                  <td>Боев</td>
                  <td>
                    {statistic.battles}
                  </td>
                </tr>
                <tr>
                  <td>Процент побед</td>
                  <td>
                    {statistic.win_rate}
                  </td>
                </tr>
                <tr>
                  <td>Золото</td>
                  <td>
                    {statistic.gold}
                  </td>
                </tr>
                <tr>
                  <td>
                    {' '}<span className="icon fa-star" /> Опыт
                  </td>
                  <td>
                    {statistic.free_xp}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  );
};

AccountDetails.propTypes = {
  account: PropTypes.shape({
    user: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    is_bound_to_phone: PropTypes.bool,
    is_with_email: PropTypes.bool,
    acc_id: PropTypes.number.isRequired,
    statistic: PropTypes.object.isRequired
  }).isRequired,
  tanks: PropTypes.array
};

export default AccountDetails;
