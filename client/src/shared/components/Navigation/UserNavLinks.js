import React, { Fragment, useContext } from 'react';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';

import CustomLink from '../../../components/FormElements/CustomLink/CustomLink';
import AuthContext from '../../../context/AuthContext';

const UserNavLinks = () => {
	let navigate = useNavigate();

	const { isLoggedIn, logout } = useContext(AuthContext);

	// let resolved = useResolvedPath(to);
	let location = useLocation();
	let match = useMatch({ path: location.pathname, end: true });
	const theme = useTheme();

	const logOutHandler = () => {
		window.localStorage.removeItem('userdata');
		console.log('User data removed from local storage.');

		logout();
		console.log('User data removed from context.');
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
