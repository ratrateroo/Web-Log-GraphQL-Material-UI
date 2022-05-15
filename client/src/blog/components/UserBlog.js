import React, { Fragment } from 'react';

import { gql, useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

const BLOG_QUERY = gql`
	query BlogQuery($id: ID!) {
		blog(id: $id) {
			blogId
			title
			content
			likes
			comments
			createdAt
			updatedAt
			author
		}
	}
`;

const UserBlog = () => {
	const params = useParams();
	const { bid } = params;
	const { data, loading, error } = useQuery(BLOG_QUERY, {
		variables: { id: bid },
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
