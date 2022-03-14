import React, { Fragment } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
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
	const theme = useTheme();

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
									Some error occured...
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
							<Grid>
								<Typography
									gutterBottom
									variant="h6"
									component="h6"
									color={theme.palette.info.main}>
									Data
								</Typography>
							</Grid>
						)}
					</Grid>
				</Box>
			</Container>
		</Fragment>
	);
};

export default UserProfileInfo;
