import React, { Fragment, useState, useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import User from './User';

const USERS_QUERY = gql`
	query getUsers {
		users {
			_id
			username
			email
			password
			firstname
			middlename
			lastname
			profileimage
			createdBlogs {
				title
			}
			createdAt
			updatedAt
		}
	}
`;

const UsersList = () => {
	const [loadedUsers, setLoadedUsers] = useState([]);

	const [getUsers, { data, loading, error }] = useLazyQuery(USERS_QUERY);

	const theme = useTheme();
	useEffect(async () => {
		try {
			await getUsers();
			setLoadedUsers(data.users);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}, [data, getUsers]);

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
					Users List
				</Typography>

				<Box sx={{ flexGrow: 1, mt: 2, p: 2 }}>
					<Grid container spacing={2}>
						{error && (
							<Grid>
								<Typography
									gutterBottom
									variant="h6"
									component="h6"
									color={theme.palette.error.main}>
									{/* Some error occured...  */}
									{error.message}
								</Typography>
							</Grid>
						)}
						{loading ? (
							<Grid>
								<Typography
									gutterBottom
									variant="h6"
									component="h6"
									color={theme.palette.info.main}>
									Loading users...
								</Typography>
							</Grid>
						) : (
							loadedUsers.map((user) => (
								<Grid item key={user._id}>
									<User
										key={user._id}
										id={user._id}
										username={user.username}
										email={user.email}
										firstname={user.firstname}
										middlename={user.middlename}
										lastname={user.lastname}
										profileimage={user.profileimage}
									/>
								</Grid>
							))
						)}
					</Grid>
				</Box>
			</Container>
		</Fragment>
	);
};

export default UsersList;
