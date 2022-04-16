import React, { Fragment, useContext, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import RequireAuth from './auth/RequireAuth';
import CreateBlog from './blog/pages/CreateBlog';
import { ColorModeContext } from './context/ColorModeContext';
import Layout from './shared/components/Layout/Layout';
import UserLogIn from './user/pages/UserLogIn';
import UserProfile from './user/pages/UserProfile';
import Users from './user/pages/Users';
import UserSignUp from './user/pages/UserSignUp';

const App = () => {
	const colorMode = useContext(ColorModeContext);

	const onUnloadHandler = () => {
		console.log('Page Refreshing.');
		window.localStorage.removeItem('userdata');
	};

	useEffect(() => {
		window.addEventListener('unload', onUnloadHandler, true);
		return () => {
			window.removeEventListener('unload', onUnloadHandler, true);
		};
	}, []);

	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Layout colorMode={colorMode} />}>
					<Route path="/profile/:uid" element={<UserProfile />} />

					<Route path="/signup" element={<UserSignUp />} />
					<Route path="/login" element={<UserLogIn />} />
					<Route
						path="/users"
						element={
							<RequireAuth>
								<Users />
							</RequireAuth>
						}
					/>
					<Route
						path="/createblog"
						element={
							<RequireAuth>
								<CreateBlog />
							</RequireAuth>
						}
					/>
				</Route>
			</Routes>
		</Fragment>
	);
};

export default App;
