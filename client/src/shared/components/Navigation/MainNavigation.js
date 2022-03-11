import React from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DefaultNavigation from './DefaultNavigation';
import UserNavigation from './UserNavigation';

const MainNavigation = ({ colorMode }) => {
	const theme = useTheme();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="medium"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							mr: 2,
							display: { xs: 'none', md: 'flex' },
						}}>
						LOGO
					</Typography>
					<DefaultNavigation />
					<UserNavigation />
					<Tooltip title={theme.palette.mode === 'light' ? 'Light Mode' : 'Dark Mode'}>
						<IconButton color="inherit" onClick={colorMode.toggleColorMode}>
							{theme.palette.mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default MainNavigation;
