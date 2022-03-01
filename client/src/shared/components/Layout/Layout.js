import React, { Fragment } from 'react';
import MainNavigation from '../Navigation/MainNavigation';
// import AuthProvider from '../../auth/AuthProvider';
import { Outlet } from 'react-router-dom';

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
