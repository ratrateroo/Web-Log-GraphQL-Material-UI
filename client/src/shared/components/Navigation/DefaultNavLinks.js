import React, { Fragment, useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

// import { AuthContext } from '../../context/auth-context';

import Button from '@mui/material/Button';

const DefaultNavLinks = () => {
	// const auth = useContext(AuthContext);

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
		</Fragment>
	);
};

export default DefaultNavLinks;
