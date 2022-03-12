import React, { Fragment, useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import { ColorModeContext } from './context/ColorModeContext';
import Layout from './shared/components/Layout/Layout';
import UserLogIn from './user/pages/UserLogIn';
import UserSignUp from './user/pages/UserSignUp';
import Users from './user/pages/Users';

const App = () => {
	const colorMode = useContext(ColorModeContext);

	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Layout colorMode={colorMode} />}>
					<Route path="/signup" element={<UserSignUp />} />
					<Route path="/login" element={<UserLogIn />} />
					<Route path="/users" element={<Users />} />
				</Route>
			</Routes>
		</Fragment>
	);
};

export default App;
