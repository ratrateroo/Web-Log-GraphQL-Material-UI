import React, { Fragment } from 'react';

import DefaultNavigation from './DefaultNavigation';
import UserNavigation from './UserNavigation';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Tooltip from '@mui/material/Tooltip';

import { useTheme } from '@mui/material/styles';

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
					<Tooltip
						title={
							theme.palette.mode === 'light' ? 'Light Mode' : 'Dark Mode'
						}>
						<IconButton
							color="inherit"
							onClick={colorMode.toggleColorMode}>
							{theme.palette.mode === 'light' ? (
								<Brightness7Icon />
							) : (
								<Brightness4Icon />
							)}
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default MainNavigation;
