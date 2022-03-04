import React, { Fragment, useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

//import { AuthContext } from '../../auth/AuthContext';

import Button from '@mui/material/Button';

const UserNavLinks = (props) => {
	//const { isLoggedIn, logout } = useContext(AuthContext);

	return (
		<Fragment>
			<Button color="inherit" to="/signup" component={RouterLink}>
				Signup
			</Button>
			<Button color="inherit" to="/login" component={RouterLink}>
				Login
			</Button>
			<Button color="inherit" to="/" component={RouterLink}>
				Logout
			</Button>
		</Fragment>
	);
};

export default UserNavLinks;
