import React, { Fragment } from 'react';

import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const DefaultNavLinks = () => {
	// const auth = useContext(AuthContext);

	return (
		<Fragment>
			<Button color="inherit" to="/" component={RouterLink}>
				Home
			</Button>
			<Button color="inherit" to="/blogs" component={RouterLink}>
				Blogs
			</Button>
			<Button color="inherit" to="/profile/622c7e8e949a05e24be5cf94" component={RouterLink}>
				Profile
			</Button>
			<Button color="inherit" to="/users" component={RouterLink}>
				Users
			</Button>

			<Button color="inherit" to="/createblog" component={RouterLink}>
				Create Blog
			</Button>
		</Fragment>
	);
};

export default DefaultNavLinks;
