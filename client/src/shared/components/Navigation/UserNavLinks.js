import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../auth/AuthContext';
import './UserNavLinks.css';

const UserNavLinks = (props) => {
	let navigate = useNavigate();

	const { isLoggedIn, logout } = useContext(AuthContext);

	return (
		<ul className="c-user-navigation__items">
			{!isLoggedIn ? (
				<React.Fragment>
					<li className="c-user-navigation__item">
						<NavLink to="/signup" className="c-user-navigation__link">
							Signup
						</NavLink>
					</li>
					<li className="c-user-navigation__item">
						<NavLink to="/login" className="c-user-navigation__link">
							Login
						</NavLink>
					</li>
				</React.Fragment>
			) : (
				<li className="c--navigation__item">
					<button
						className="c-user-navigation__link"
						onClick={() => {
							logout(() => navigate('/'));
						}}>
						Logout
					</button>
				</li>
			)}
		</ul>
	);
};

export default UserNavLinks;
