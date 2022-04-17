import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, onClick }) => {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });
	const theme = useTheme();

	return (
		<div>
			<Button
				color="inherit"
				to={to}
				component={RouterLink}
				sx={{
					backgroundColor: match ? theme.palette.secondary.main : 'none',
				}}
				onClick={onClick}>
				{children}
			</Button>
		</div>
	);
};

export default CustomLink;
