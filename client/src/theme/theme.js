import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#4c4320',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			//light: '#0066ff',
			main: '#244a51',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffcc00',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
	typography: {
		subtitle1: {
			fontSize: 12,
		},
		subtitle2: {
			color: 'red',
		},

		body1: {
			fontWeight: 500,
		},
		button: {
			fontStyle: 'italic',
		},
	},
});
export default theme;
