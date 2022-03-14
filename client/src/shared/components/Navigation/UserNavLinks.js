import React, { Fragment, useContext } from 'react';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useMatch, useResolvedPath } from 'react-router-dom';

import AuthContext from '../../../context/AuthContext';

const CustomLink = ({ children, to, onClick }) => {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });
	const theme = useTheme();

	return (
		<div>
			<Button
				color="inherit"
				to={to}
				component={RouterLink}
				sx={{
					backgroundColor: match ? theme.palette.secondary.main : 'none',
				}}
				onClick={onClick}>
				{children}
			</Button>
		</div>
	);
};

const UserNavLinks = () => {
	//const { isLoggedIn, logout } = useContext(AuthContext);

	const { isLoggedIn, logout } = useContext(AuthContext);

	const logOutHandler = () => {
		logout();
	};

	return (
		<Fragment>
			{isLoggedIn ? (
				<CustomLink to="/" onClick={logOutHandler}>
					Logout
				</CustomLink>
			) : (
				<Fragment>
					<CustomLink to="/signup">Signup</CustomLink>
					<CustomLink to="/login">Login</CustomLink>
				</Fragment>
			)}
		</Fragment>
	);
};

export default UserNavLinks;
