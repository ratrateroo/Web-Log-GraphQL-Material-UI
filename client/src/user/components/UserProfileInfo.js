import React, { Fragment } from 'react';

import { gql, useQuery } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

const USER_QUERY = gql`
	query UserQuery($id: ID!) {
		user(id: $id) {
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

// const GET_DOG_PHOTO = gql`
//   query Dog($breed: String!) {
//     dog(breed: $breed) {
//       id
//       displayImage
//     }
//   }
// `;

const UserProfileInfo = () => {
	const params = useParams();
	const { uid } = params;
	const { data, loading, error } = useQuery(USER_QUERY, {
		variables: { id: uid },
	});

	console.log(data);

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

				{error && (
					<Typography variant="h5" component="h5" color="secondary">
						Some error occured...
					</Typography>
				)}

				<Box sx={{ flexGrow: 1, mt: 2, p: 2 }}>
					{loading ? (
						<LinearProgress color="secondary" />
					) : (
						<Fragment>
							<Typography variant="h5" component="h5" color="secondary">
								{data.user.firstname +
									' ' +
									data.user.middlename +
									' ' +
									data.user.lastname}
							</Typography>

							<Grid container spacing={2}>
								<Grid>
									<Avatar
										alt="Profile Image"
										src={
											data.user.profileimage === 'defaultimage'
												? 'http://localhost:8000/freefiles/images/user_image.png'
												: `http://localhost:8000/freefiles/images/${data.user.profileimage}`
										}
										sx={{ width: 56, height: 56 }}
									/>
								</Grid>
							</Grid>
						</Fragment>
					)}
				</Box>
			</Container>
		</Fragment>
	);
};

export default UserProfileInfo;
