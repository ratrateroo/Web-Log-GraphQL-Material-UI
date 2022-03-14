import React, { Fragment, useState, useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import User from './User';

const USERS_QUERY = gql`
	{
		users {
			_id
			username
			email
			password
			firstname
			middlename
			lastname
			profileimage
		}
	}
`;

const UsersList = () => {
	const [loadedUsers, setLoadedUsers] = useState([]);

	const [getUsers, { data, loading, error }] = useLazyQuery(USERS_QUERY);

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
			<Container component="main">
				<CssBaseline />
				<Typography>Users List</Typography>
				<Box sx={{ flexGrow: 1, mt: 2 }}>
					<Grid container spacing={2}>
						{/* {loadedUsers.map(user,index) => {
                        <Grid item>
						<UserCard username={user.}/>
					</Grid>
                    }} */}
						{loading && (
							<Typography gutterBottom variant="h5" component="div">
								Loading...
							</Typography>
						)}
						{error && (
							<Typography gutterBottom variant="h5" component="div">
								Some error occured...
							</Typography>
						)}
						{data &&
							loadedUsers.map((user) => (
								<Grid item key={user._id}>
									<User
										id={user._id}
										username={user.username}
										email={user.email}
										firstname={user.firstname}
										middlename={user.middlename}
										lastname={user.lastname}
										profileimage={user.profileimage}
									/>
								</Grid>
							))}

						{/* <Grid item xs={6} md={8}>
						<UserCard />
					</Grid> */}
					</Grid>
				</Box>
				<User />
			</Container>
		</Fragment>
	);
};

export default UsersList;
