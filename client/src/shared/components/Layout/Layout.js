import React, { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import MainNavigation from '../Navigation/MainNavigation';
// import AuthProvider from '../../auth/AuthProvider';

const Layout = ({ colorMode }) => {
	return (
		// <AuthProvider>
		<Fragment>
			<MainNavigation colorMode={colorMode} />
			<Outlet />
		</Fragment>
		// </AuthProvider>
	);
};

export default Layout;
