import React, { Fragment, useState, useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
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
			author {
				_id
				username
			}
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
				<Box>
					<Grid item xs={12} md={6}>
						<List>
							{loadedBlogs.map((blog) => {
								return (
									<ListItem
										key={blog.blogId}
										secondaryAction={
											<IconButton edge="end" aria-label="delete">
												<DeleteIcon />
											</IconButton>
										}>
										<ListItemAvatar>
											<Avatar>
												<FolderIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary={blog.title} secondary={blog.author.username} />
									</ListItem>
								);
							})}
						</List>
					</Grid>
				</Box>
			</Container>
		</Fragment>
	);
};

export default BlogsList;
