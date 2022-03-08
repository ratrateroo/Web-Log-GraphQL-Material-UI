import React, { Fragment, useContext } from 'react';

import {
	Link as RouterLink,
	useMatch,
	useResolvedPath,
	useLocation,
} from 'react-router-dom';

//import { AuthContext } from '../../auth/AuthContext';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function CustomLink({ children, to, ...props }) {
	let resolved = useResolvedPath(to);
	console.log(resolved);
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
				{...props}>
				{children}
			</Button>
		</div>
	);
}

const UserNavLinks = (props) => {
	//const { isLoggedIn, logout } = useContext(AuthContext);

	const theme = useTheme();

	return (
		<Fragment>
			<CustomLink to="/signup">Signup</CustomLink>
			<CustomLink to="/login">Login</CustomLink>
			<CustomLink to="/">Logout</CustomLink>
		</Fragment>
	);
};

export default UserNavLinks;
