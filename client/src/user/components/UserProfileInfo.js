import React, { Fragment, useState, useRef } from 'react';

import { gql, useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
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
			createdAt
			updatedAt
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
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const inputFileEl = useRef(null);
	const params = useParams();
	const { uid } = params;
	const { data, loading, error } = useQuery(USER_QUERY, {
		variables: { id: uid },
	});
	const theme = useTheme();
	console.log(data);

	const openModalHandler = () => {
		setOpenUpdateModal(true);
	};

	const closeModalHandler = () => {
		setOpenUpdateModal(false);
	};

	const fileSelectorHander = () => {
		inputFileEl.current.click();
	};

	return (
		<Fragment>
			<Container
				component="main"
				sx={{
					mt: '1rem',
					mb: '2rem',
					p: '1rem',
					maxWidth: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
					minWidth: 'xs',
					//backgroundColor: 'goldenrod',
				}}>
				<CssBaseline />

				{error && (
					<Typography
						variant="h5"
						component="h5"
						color="secondary"
						sx={{ color: theme.palette.error.main }}>
						Some error occured...
					</Typography>
				)}

				<Box
					sx={{
						flexGrow: 1,
						m: 2,
						p: 2,
						//backgroundColor: 'blueviolet'
					}}>
					{loading ? (
						<LinearProgress color="secondary" />
					) : (
						<Fragment>
							<Paper
								sx={{
									m: '1rem',
									p: '1rem',
									//color: theme.palette.primary.contrastText,
									//backgroundColor: 'white',
								}}>
								<Typography
									sx={{
										fontSize: {
											xs: '1rem',
											sm: '1.3rem',
											md: '1.5rem',
											lg: '1.5rem',
											xl: '1.5rem',
										},
										textAlign: {
											xs: 'center',
											sm: 'center',
											md: 'left',
											lg: 'left',
											xl: 'left',
										},
									}}
									color="secondary">
									{data.user.firstname +
										' ' +
										data.user.middlename +
										' ' +
										data.user.lastname}
								</Typography>
							</Paper>
							<Paper
								sx={{
									m: '1rem',
									p: '1rem',
									//backgroundColor: 'white',
									// color: theme.palette.primary.contrastText,
								}}>
								<Grid
									container
									direction={{
										xs: 'column',
										sm: 'column',
										md: 'row',
										lg: 'row',
										xl: 'row',
									}}
									justifyContent={{
										xs: 'center',
										sm: 'center',
										md: 'space-even',
										lg: 'space-even',
										xl: 'space-even',
									}}
									alignItems="center"
									spacing={1}>
									<Grid item xs={5} md={5}>
										<Box
											sx={{
												backgroundColor: 'green',
												display: 'flex',
												justifyContent: 'center',
												flexDirection: 'column',
												alignItems: 'center',
											}}>
											<Avatar
												alt="Profile Image"
												src={
													data.user.profileimage === 'defaultimage'
														? 'http://localhost:8000/freefiles/images/user_image.png'
														: `http://localhost:8000/freefiles/images/${data.user.profileimage}`
												}
												sx={{ width: '10rem', height: '10rem' }}
											/>
											<Button
												type="submit"
												variant="contained"
												sx={{ width: '10rem', marginTop: '10px' }}
												size="small"
												onClick={openModalHandler}>
												Update Photo
											</Button>
										</Box>
									</Grid>
									<Grid item xs={5} md={5}>
										<Box
											sx={{
												backgroundColor: 'green',
												display: 'flex',
												justifyContent: 'center',
												flexDirection: 'column',
												alignItems: 'center',
											}}>
											<Grid container spacing={3}>
												<Grid item>
													<Typography
														color="secondary"
														sx={{
															fontSize: {
																xs: '1rem',
																sm: '1.3rem',
																md: '1.5rem',
																lg: '1.5rem',
																xl: '1.5rem',
															},
														}}>
														{'Blogs: '}
													</Typography>
													<Typography
														color="secondary"
														sx={{
															fontSize: {
																xs: '1rem',
																sm: '1.3rem',
																md: '1.5rem',
																lg: '1.5rem',
																xl: '1.5rem',
															},
														}}>
														{'Friends: '}
													</Typography>
												</Grid>
												<Grid item>
													<Typography
														sx={{
															color: theme.palette.contrastText,
															fontSize: {
																xs: '1rem',
																sm: '1.3rem',
																md: '1.5rem',
																lg: '1.5rem',
																xl: '1.5rem',
															},
														}}>
														{0}
													</Typography>
													<Typography
														sx={{
															color: theme.palette.contrastText,
															fontSize: {
																xs: '1rem',
																sm: '1.3rem',
																md: '1.5rem',
																lg: '1.5rem',
																xl: '1.5rem',
															},
														}}>
														{0}
													</Typography>
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Paper>
							<Paper
								sx={{
									m: '1rem',
									p: '1rem',
									//backgroundColor: 'white',
								}}>
								<Grid container>
									<Grid item>
										<Grid container spacing={3}>
											<Grid item>
												<Typography
													sx={{
														fontSize: '1rem',
													}}
													color="secondary">
													{'Username: '}
												</Typography>
												<Typography
													sx={{
														fontSize: '1rem',
													}}
													color="secondary">
													{'Email: '}
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													sx={{
														color: theme.palette.contrastText,
														fontSize: '1rem',
													}}>
													{data.user.username}
												</Typography>
												<Typography
													sx={{
														color: theme.palette.contrastText,
														fontSize: '1rem',
													}}>
													{data.user.email}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Paper>

							<Modal
								open={openUpdateModal}
								onClose={closeModalHandler}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
								sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Box component={Paper} elevation={3} sx={{}}>
									<Grid
										container
										direction="column"
										justifyContent="center"
										alignItems="center"
										sx={{
											padding: '1rem',
										}}>
										<Grid
											item
											sx={{
												display: 'flex',
												justifyContent: 'flex-end',
												width: '100%',
											}}>
											<IconButton
												aria-label="close update image modal"
												size="small"
												onClick={closeModalHandler}>
												<CloseIcon />
											</IconButton>
										</Grid>
										<Grid item>
											<Typography id="modal-modal-title" variant="h6" component="h2">
												Text in a modal
											</Typography>
										</Grid>
										<Grid item>
											<Avatar
												alt="Profile Image"
												src={
													data.user.profileimage === 'defaultimage'
														? 'http://localhost:8000/freefiles/images/user_image.png'
														: `http://localhost:8000/freefiles/images/${data.user.profileimage}`
												}
												sx={{ width: '10rem', height: '10rem' }}
											/>
										</Grid>
										<Grid item>
											{/* <label htmlFor="raised-button-file"> */}
											<Button
												variant="contained"
												sx={{ width: '10rem', marginTop: '10px' }}
												size="small"
												component="span"
												onClick={fileSelectorHander}>
												Update Photo
											</Button>
											{/* </label> */}

											<Input
												inputRef={inputFileEl}
												type="file"
												accept="image/*"
												sx={{ display: 'none' }}
												multiple
												id="raised-button-file"
												onChange={() => console.log('changed')}
												onClick={() => console.log('clicked')}
												onInput={() => console.log('input')}
											/>
										</Grid>
									</Grid>
								</Box>
							</Modal>
						</Fragment>
					)}
				</Box>
			</Container>
		</Fragment>
	);
};

export default UserProfileInfo;
