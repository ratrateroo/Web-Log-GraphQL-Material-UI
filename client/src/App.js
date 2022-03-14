import React, { Fragment, useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import RequireAuth from './auth/RequireAuth';
import { ColorModeContext } from './context/ColorModeContext';
import Layout from './shared/components/Layout/Layout';
import UserLogIn from './user/pages/UserLogIn';
import Users from './user/pages/Users';
import UserSignUp from './user/pages/UserSignUp';

const App = () => {
	const colorMode = useContext(ColorModeContext);

	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Layout colorMode={colorMode} />}>
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
				</Route>
			</Routes>
		</Fragment>
	);
};

export default App;
