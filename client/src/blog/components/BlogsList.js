import React, { Fragment, useState, useEffect } from 'react';
import { Link as RouterLink, useMatch, useResolvedPath } from 'react-router-dom';

import { gql, useLazyQuery } from '@apollo/client';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import { useTheme } from '@mui/material';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
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
				profileimage
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
			if (data) {
				setLoadedBlogs(data.blogs);
				console.log(data);
			}
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
				<Box
					sx={{
						marginTop: '2rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
						alignItems: 'start',
						marginBottom: '1rem',
					}}>
					<Grid container>
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
							<Grid
								item
								sx={{
									width: '100%',
								}}>
								<List>
									{loadedBlogs.map((blog, i) => {
										return (
											<Fragment key={blog.blogId}>
												<ListItem key={blog.blogId + i}>
													<ListItemAvatar>
														<Avatar
															alt="Profile Image"
															src={
																blog.author.profileimage === 'defaultimage'
																	? 'http://localhost:8000/freefiles/images/user_image.png'
																	: `http://localhost:8000/freefiles/images/${blog.author.profileimage}`
															}
														/>
													</ListItemAvatar>
													<ListItemText
														primary={blog.title}
														secondary={blog.author.username}
													/>

													<ListItemIcon>
														<IconButton
															to={`/blog/${blog.blogId}`}
															component={RouterLink}
															edge="end"
															aria-label="delete">
															<MenuBookSharpIcon />
														</IconButton>
													</ListItemIcon>
												</ListItem>
												<Divider />
											</Fragment>
										);
									})}
								</List>
							</Grid>
						)}
					</Grid>
				</Box>
			</Container>
		</Fragment>
	);
};

export default BlogsList;
