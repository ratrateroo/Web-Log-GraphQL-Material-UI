import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './shared/components/Layout/Layout';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import TestPage from './user/pages/TestPage';

const App = () => {
	return (
		<Fragment>
			<MainNavigation />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/signup" element={<TestPage />} />
				</Route>
			</Routes>
		</Fragment>
	);
};

export default App;
