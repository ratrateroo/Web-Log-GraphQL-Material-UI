import React, { Fragment } from 'react';
import MainNavigation from '../Navigation/MainNavigation';
// import AuthProvider from '../../auth/AuthProvider';
import { Outlet } from 'react-router';

const Layout = (props) => {
	return (
		// <AuthProvider>
		<Fragment>
			<MainNavigation />
			<Outlet />
		</Fragment>
		// </AuthProvider>
	);
};

export default Layout;
