import { createTheme } from '@mui/material/styles';

const darktheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#346664',
			light: '#3C8785',
			dark: '#2D4A47',
			contrastText: '#ffffff',
		},
		secondary: {
			//main: '#DDB573',
			main: '#c98403',
			//light: '#EFDEBF',
			light: '#d0983b',
			//dark: '#CB904D',
			dark: '#ba5900',
			contrastText: '#ffffff',
		},
		error: {
			main: '#F34642',
			light: '#F39593',
			dark: '#E92424',
			contrastText: '#ffffff',
		},
		success: {
			main: '#A7DD5F',
			light: '#C3E991',
			dark: '#81B74B',
			contrastText: '#000000',
		},
		warning: {
			main: '#CCAB00',
			light: '#dfcb74',
			dark: '#c69d00',
			contrastText: '#000000',
		},
		info: {
			main: '#afc5c3',
			light: '#cedcdb',
			dark: '#90adab',
			contrastText: '#000000',
		},
		background: {
			default: '#353131',
			paper: '#346664',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
});
export default darktheme;
