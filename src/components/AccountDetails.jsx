import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchAccount } from '../actions/actions.js';
import AccountComponent from './AccountPreview.jsx';

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(AccountComponent);

export default FilterLink;

const Link = ({ active, children, onClick }) => {
  if (active) {
    return (
      <span>
        {children}
      </span>
    );
  }

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
              <div className="loader" />
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
