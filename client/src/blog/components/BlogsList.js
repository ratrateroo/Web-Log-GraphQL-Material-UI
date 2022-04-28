import React, { Fragment, useState, useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const BLOGS_QUERY = gql`
	query getBlogs {
		blogs {
			blogId
			title
			content
			likes
			comments
			createdAt
			updatedAt

			# author {
			# 	_id
			# }
		}
	}
`;

const BlogsList = () => {
	const [loadedBlogs, setLoadedBlogs] = useState([]);

	const [getBlogs, { data, loading, error }] = useLazyQuery(BLOGS_QUERY);

	const theme = useTheme();
	useEffect(async () => {
		try {
			await getBlogs();
			setLoadedBlogs(data.blogs);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}, [data, getBlogs]);

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
					Blogs List
				</Typography>
			</Container>
		</Fragment>
	);
};

export default BlogsList;
