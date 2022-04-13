import React, { Fragment } from 'react';

import { gql, useMutation } from '@apollo/client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';

import Input from '../../components/FormElements/Input/index';
import { useForm } from '../../hooks/useForm/index';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../services/validators/index';

const CREATEBLOG_MUTATION = gql`
	mutation CreateBlogMutation($title: String!, $content: String!) {
		createBlog(blogInput: { title: $title, content: $content }) {
			blogId
			title
			content
			likes
			comments
		}
	}
`;

const CreateBlogForm = () => {
	let navigate = useNavigate();
	let location = useLocation();
	let from = location.state?.from?.pathname || '/';

	const [signUpUser, { error, data }] = useMutation(CREATEBLOG_MUTATION, {
		onCompleted: ({ createBlog }) => {
			console.log(createBlog);

			navigate(from, { replace: true });
		},
	});

	//useForm Hook
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: '',
				isValid: true,
			},
			content: {
				value: '',
				isValid: true,
			},
		},
		false
	);

	const createBlogHandler = (e) => {
		e.preventDefault();

		try {
			signUpUser({
				variables: {
					title: formState.inputs.title.value,
					content: formState.inputs.content.value,
				},
			}).catch((err) => {
				console.log(err);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Container
				component="main"
				sx={{
					maxWidth: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
				}}>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 5,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h4" variant="h4">
						Create Blog
					</Typography>
					{data ? (
						<Typography component="h6" variant="h6" color="secondary">
							{data ? 'Blog creation successful!' : '\u00A0'}
						</Typography>
					) : (
						<Typography component="h6" variant="h6" color="secondary">
							{error ? 'Something went wrong, please try again.' : '\u00A0'}
						</Typography>
					)}

					<Box component="form" onSubmit={createBlogHandler} sx={{ mt: 5, width: '100%' }}>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container>
								<Grid item sx={{ width: '100%' }}>
									<Input
										type="text"
										id="title"
										label="Title"
										placeholder="Enter the title here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_REQUIRE()]}
									/>

									<Input
										type="text"
										id="content"
										label="Content"
										placeholder="Enter the content here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_MINLENGTH(100)]}
										multiline
									/>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={0}
								direction="column"
								alignItems="center"
								justifyContent="center"
								sx={{
									marginTop: '2rem',
								}}>
								<Grid item xs={3}>
									<Tooltip
										title={
											!formState.isValid
												? 'Provide all details required!'
												: 'Valid details are provided!'
										}
										placement="top">
										<span>
											<Button
												type="submit"
												variant="contained"
												sx={{ marginBottom: '1rem' }}
												size="large"
												disabled={!formState.isValid}
												onClick={createBlogHandler}>
												Create Blog
											</Button>
										</span>
									</Tooltip>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Box>
			</Container>
		</Fragment>
	);
};

export default CreateBlogForm;
