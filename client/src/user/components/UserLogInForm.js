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
import { setUserData } from '../../services/UserData/index';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../services/validators/index';

//import { setUserData } from '../util/userData';

export const LOGIN_MUTATION = gql`
	mutation LogInMutation($username: String!, $password: String) {
		logInUser(userInput: { username: $username, password: $password }) {
			userId
			token
			tokenExpiration
		}
	}
`;

const UserSignUpForm = () => {
	let navigate = useNavigate();
	let location = useLocation();
	let from = location.state?.from?.pathname || '/';

	const [logInUser, { error, data }] = useMutation(LOGIN_MUTATION, {
		onCompleted: ({ logInUser }) => {
			setUserData({
				token: logInUser.token,
				userId: logInUser.userId,
				tokenExpiration: logInUser.tokenExpiration,
			});
			localStorage.setItem('Token', JSON.stringify(logInUser.token));
			console.log(logInUser);
			setFormData(
				{
					username: {
						value: '',
						isValid: true,
					},

					password: {
						value: '',
						isValid: true,
					},
				},
				false
			);
			navigate(from, { replace: true });
		},
	});

	//useForm Hook
	const [formState, inputHandler, setFormData] = useForm(
		{
			username: {
				value: '',
				isValid: true,
			},

			password: {
				value: '',
				isValid: true,
			},
		},
		false
	);

	const logInUserHandler = (e) => {
		e.preventDefault();

		try {
			logInUser({
				variables: {
					username: formState.inputs.username.value,
					password: formState.inputs.password.value,
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
						Log In
					</Typography>
					{data ? (
						<Typography component="h6" variant="h6" color="secondary">
							{data ? 'Login successful!' : '\u00A0'}
						</Typography>
					) : (
						<Typography component="h6" variant="h6" color="secondary">
							{error
								? error.message === 'Password is incorrect.' ||
								  error.message === 'User does not exist.'
									? error.message
									: 'Something went wrong, please try again.'
								: '\u00A0'}
						</Typography>
					)}

					<Box component="form" onSubmit={logInUserHandler} sx={{ mt: 5 }}>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={0}>
								<Grid item xs={12}>
									<Input
										type="text"
										id="username"
										label="Username"
										placeholder="Enter your username here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_REQUIRE()]}
									/>

									<Input
										type="password"
										id="password"
										label="Password"
										placeholder="Enter your password here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_MINLENGTH(5)]}
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
												sx={{}}
												size="large"
												disabled={!formState.isValid}
												onClick={logInUserHandler}>
												Log In
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

export default UserSignUpForm;
