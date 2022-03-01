import { useState, useMemo } from 'react';
import { ColorModeContext } from './ColorModeContext';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from '../theme/theme';
import lighttheme from '../theme/lighttheme';
import darktheme from '../theme/darktheme';

const ColorModeProvider = ({ children }) => {
	const [mode, setMode] = useState('light');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	// const theme = useMemo(
	// 	() =>
	// 		createTheme({
	// 			palette: {
	// 				mode,
	// 			},
	// 		}),
	// 	[mode]
	// );

	const theme = useMemo(() => {
		return mode === 'light' ? lighttheme : darktheme;
	}, [mode]);

	let value;
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default ColorModeProvider;
