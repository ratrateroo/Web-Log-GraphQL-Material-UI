import React, { Fragment } from 'react';

import CustomLink from '../../../components/FormElements/CustomLink/CustomLink';

const DefaultNavLinks = () => {
	return (
		<Fragment>
			<CustomLink to="/">Home</CustomLink>
			<CustomLink to="/blogs">Blogs</CustomLink>
			<CustomLink to="/users">Users</CustomLink>
			<CustomLink to="/createblog">Create Blog</CustomLink>
		</Fragment>
	);
};

export default DefaultNavLinks;
