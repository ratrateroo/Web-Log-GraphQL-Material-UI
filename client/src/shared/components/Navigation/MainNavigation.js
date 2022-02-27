import React, { Fragment } from 'react';

import DefaultNavigation from './DefaultNavigation';
import UserNavigation from './UserNavigation';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const MainNavigation = () => {
	return (
		<Fragment>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<DefaultNavigation />
						{/* <UserNavigation /> */}
					</Toolbar>
				</Container>
			</AppBar>
		</Fragment>
	);
};

export default MainNavigation;
