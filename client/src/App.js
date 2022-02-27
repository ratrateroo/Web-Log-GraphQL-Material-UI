import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './shared/components/Layout/Layout';

const App = () => {
	return (
		<Fragment>
			<Routes>
				<Route element={<Layout />}></Route>
			</Routes>
		</Fragment>
	);
};

export default App;
