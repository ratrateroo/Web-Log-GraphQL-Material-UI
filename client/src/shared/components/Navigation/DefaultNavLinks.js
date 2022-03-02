import React, { Fragment, useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

// import { AuthContext } from '../../context/auth-context';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const DefaultNavLinks = ({ colorMode }) => {
	// const auth = useContext(AuthContext);
	const theme = useTheme();

	return (
		<Fragment>
			<Button color="inherit" to="/blogs" component={RouterLink}>
				Home
			</Button>
			<Button color="inherit" to="/users" component={RouterLink}>
				Users
			</Button>
			{/* {auth.token && (
				<Button color="inherit" to="/friends" component={RouterLink}>
					Friends
				</Button>
			)} */}

			<IconButton color="inherit" onClick={colorMode.toggleColorMode}>
				{theme.palette.mode === 'light' ? (
					<Brightness7Icon />
				) : (
					<Brightness4Icon />
				)}
			</IconButton>
		</Fragment>
	);
};

export default DefaultNavLinks;
