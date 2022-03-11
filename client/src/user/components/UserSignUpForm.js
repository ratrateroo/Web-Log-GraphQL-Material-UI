import React, { Fragment, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useForm } from '../../hooks/useForm/index';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../services/validators/index';

//import { setUserData } from '../util/userData';

export const SIGNUP_MUTATION = gql`
	mutation SignUpMutation($username: String!) {
		signUpUser(userInput: { username: $username }) {
			userId
			token
			tokenExpiration
		}
	}
`;

const UserSignUpForm = () => {
	const [signUpUser, { error }] = useMutation(SIGNUP_MUTATION);
	const [user, setUser] = useState({
		username: '',
		password: '',
	});

	//useForm Hook
	const [formState, inputHandler] = useForm(
		{
			username: {
				value: '',
				isValid: true,
			},
			email: {
				value: '',
				isValid: true,
			},
			password: {
				value: '',
				isValid: true,
			},
			firstname: {
				value: '',
				isValid: true,
			},
			middlename: {
				value: '',
				isValid: true,
			},
			lastname: {
				value: '',
				isValid: true,
			},
		},
		false
	);

	// function usernameChangeHandler(e) {
	// 	setUser({
	// 		...user,
	// 		username: e.target.value,
	// 	});
	// }

	// function signUpUserHandler(e) {
	// 	e.preventDefault();

	// 	try {
	// 		signUpUser({
	// 			variables: {
	// 				username: user.username,
	// 			},
	// 			onCompleted: ({ signUpUser }) => {
	// 				// setUserData({
	// 				// 	token: signUpUser.token,
	// 				// 	userId: signUpUser.userId,
	// 				// 	tokenExpiration: signUpUser.tokenExpiration,
	// 				// });
	// 			},
	// 		}).catch((err) => {
	// 			console.log(err);
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}

	// 	console.log(user);
	// }

	return (
		<Fragment>
			<Container component="main" maxWidth="md">
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
						Sign Up
					</Typography>
					<Box
						component="form"
						noValidate
						// onSubmit={signUpUserHandler}
						sx={{ mt: 5 }}>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={5}>
								<Grid item xs={6}>
									<Typography component="h6" variant="h6">
										Account Information
									</Typography>
									<TextField
										margin="normal"
										id="username"
										label="Username"
										type="text"
										size="small"
										fullWidth
										required={true}
									/>

									<TextField
										margin="normal"
										id="password"
										label="Password"
										type="password"
										size="small"
										fullWidth
										required={true}
									/>
									<TextField
										margin="normal"
										id="email"
										label="Email"
										type="email"
										size="small"
										fullWidth
										required={true}
									/>
								</Grid>
								<Grid item xs={6}>
									<Typography component="h6" variant="h6">
										Personal Details
									</Typography>
									<TextField
										margin="normal"
										id="firstname"
										label="First Name"
										type="text"
										size="small"
										fullWidth
										required={true}
									/>
									<TextField
										margin="normal"
										id="middlename"
										label="Middle Name"
										type="text"
										size="small"
										fullWidth
										required={true}
									/>
									<TextField
										margin="normal"
										id="lastname"
										label="Last Name"
										type="text"
										size="small"
										fullWidth
										required={true}
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
									<Button type="submit" variant="contained" sx={{}} size="large">
										Sign Up
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Box>
			</Container>
		</Fragment>
	);
};

export default UserSignUpForm;
