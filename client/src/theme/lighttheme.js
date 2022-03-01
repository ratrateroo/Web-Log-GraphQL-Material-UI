import { createTheme } from '@mui/material/styles';

const lighttheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#51a3a3',
			light: '#73B5B5',
			dark: '#387272',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#cb904d',
			light: '#D5A670',
			dark: '#8E6435',
			contrastText: '#ffffff',
		},
		error: {
			main: '#e92424',
			light: '#ED4F4F',
			dark: '#A31919',
			contrastText: '#ffffff',
		},
		success: {
			main: '#A7DD5F',
			light: '#C3E991',
			dark: '#81B74B',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#c69d00',
			light: '#d3b93a',
			dark: '#c88100',
			contrastText: '#ffffff',
		},
		info: {
			main: '#557876',
			light: '#90ACAB',
			dark: '#384F4F',
			contrastText: '#ffffff',
		},
		background: {
			default: '#ffffff',
			paper: '#ffffff',
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
export default lighttheme;
