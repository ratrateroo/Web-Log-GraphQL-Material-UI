import React, { Fragment } from 'react';

import DefaultNavigation from './DefaultNavigation';
import UserNavigation from './UserNavigation';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const MainNavigation = ({ colorMode }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="medium"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}></Typography>
					<DefaultNavigation colorMode={colorMode} />
					{/* <UserNavigation /> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default MainNavigation;
