import { Fragment, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './shared/components/Layout/Layout';
import UserSignUp from './user/pages/UserSignUp';

import { ColorModeContext } from './context/ColorModeContext';

import { useTheme } from '@mui/material/styles';

const App = () => {
	const colorMode = useContext(ColorModeContext);
	const theme = useTheme();
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
