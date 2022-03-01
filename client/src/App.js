import { Fragment, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './shared/components/Layout/Layout';
import SignUp from './user/pages/SignUp';

import { ColorModeContext } from './context/ColorModeContext';

const App = () => {
	const colorMode = useContext(ColorModeContext);
	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/signup" element={<SignUp />} />
				</Route>
			</Routes>
		</Fragment>
	);
};

export default App;
