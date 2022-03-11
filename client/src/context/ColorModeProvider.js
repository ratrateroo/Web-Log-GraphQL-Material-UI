import { useState, useMemo } from 'react';

import { ThemeProvider } from '@mui/material/styles';
//import theme from '../theme/theme';

import darktheme from '../theme/darktheme';
import lighttheme from '../theme/lighttheme';
import { ColorModeContext } from './ColorModeContext';

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

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default ColorModeProvider;
