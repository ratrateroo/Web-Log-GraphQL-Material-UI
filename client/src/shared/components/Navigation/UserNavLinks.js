import React, { Fragment, useContext } from 'react';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
	Link as RouterLink,
	useMatch,
	useResolvedPath,
	useNavigate,
	useLocation,
} from 'react-router-dom';

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
	let navigate = useNavigate();

	const { isLoggedIn, logout } = useContext(AuthContext);

	// let resolved = useResolvedPath(to);
	let location = useLocation();
	let match = useMatch({ path: location.pathname, end: true });
	const theme = useTheme();

	const logOutHandler = () => {
		logout();

		window.localStorage.removeItem('userdata');
		navigate('/', { replace: true });
	};

	return (
		<Fragment>
			{isLoggedIn ? (
				<Button
					onClick={logOutHandler}
					sx={{
						backgroundColor: match ? theme.palette.secondary.main : 'none',
						color: 'inherit',
					}}>
					Logout
				</Button>
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
