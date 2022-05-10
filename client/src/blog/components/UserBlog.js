import React, { Fragment } from 'react';

import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

const UserBlog = () => {
	return (
		<Fragment>
			<Container
				component="main"
				sx={{
					mt: '1rem',
					mb: '2rem',
					maxWidth: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
				}}>
				<CssBaseline />

				<Typography variant="h5" component="h5" color="secondary">
					Title
				</Typography>
				<Box
					sx={{
						marginTop: '2rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
						alignItems: 'start',
						marginBottom: '1rem',
					}}>
					<Typography variant="h5" component="h5" color="secondary">
						Content
					</Typography>
					<Typography variant="h5" component="h5" color="secondary">
						Likes
					</Typography>
					<Typography variant="h5" component="h5" color="secondary">
						Comments
					</Typography>
				</Box>
			</Container>
		</Fragment>
	);
};

export default UserBlog;
