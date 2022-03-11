import React, { Fragment } from 'react';

import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

// import { AuthContext } from '../../context/auth-context';

const DefaultNavLinks = () => {
	// const auth = useContext(AuthContext);

	return (
		<Fragment>
			<Button color="inherit" to="/" component={RouterLink}>
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
