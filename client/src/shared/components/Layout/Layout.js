import React, { Fragment } from 'react';
import MainNavigation from '../Navigation/MainNavigation';
// import AuthProvider from '../../auth/AuthProvider';
import { Outlet } from 'react-router-dom';

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
