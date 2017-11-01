import React, { Component } from 'react';

const Header = loginData => {
	return (
		<div>
			<div id="status-bar">
				<div className="container">
					<div className="profile">
						<a href="/login">Login</a>
						<a href="/register">Register</a>
						<div className="loginPopup">
							<div className="row">
								<div className="col-xs-4">
									<button className="odnoklassniki icon fa-odnoklassniki" />
								</div>
								<div className="col-xs-4">
									<button className="google icon fa-google" />
								</div>
								<div className="col-xs-4">
									<button className="vk icon fa-vk" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<header id="header" className="container">
				<div className="col-xs-12">
					<div id="logo">
						<h1>
							<a href="/">AccShop</a>
						</h1>
						<span>ACOOUNTS TRADING PLACE</span>
					</div>
					<nav id="nav">
						<ul>
							<li className="opener">
								<a href="/sell">Продать акк</a>
								<ul className="">
									<li>
										<a href="index.html">All</a>
									</li>
									<li>
										<a href="#">WOT</a>
									</li>
									<li className="opener">
										<a href="#">Battle.net</a>
										<ul className="dropotron">
											<li>
												<a href="#">ACCOUNTS</a>
											</li>
											<li>
												<a href="#">GOLD</a>
											</li>
											<li>
												<a href="#">RANKUP</a>
											</li>
											<li>
												<a href="#">OTHER</a>
											</li>
										</ul>
									</li>
									<li>
										<a href="#">STEAM</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="/feedbacks">Отзывы</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</div>
	);
};

export default Header;
