import React, { Fragment, useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import { ColorModeContext } from './context/ColorModeContext';
import Layout from './shared/components/Layout/Layout';
import UserSignUp from './user/pages/UserSignUp';

const App = () => {
	const colorMode = useContext(ColorModeContext);

	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Layout colorMode={colorMode} />}>
					<Route path="/signup" element={<UserSignUp />} />
				</Route>
			</Routes>
		</Fragment>
	);
};

export default App;
