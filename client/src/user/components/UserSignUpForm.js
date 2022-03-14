import React, { Fragment, useContext } from 'react';

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
import AuthContext from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm/index';
import { setUserData } from '../../services/UserData/index';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from '../../services/validators/index';

const SIGNUP_MUTATION = gql`
	mutation SignUpMutation(
		$username: String!
		$email: String!
		$password: String
		$firstname: String!
		$middlename: String!
		$lastname: String!
	) {
		signUpUser(
			userInput: {
				username: $username
				email: $email
				password: $password
				firstname: $firstname
				middlename: $middlename
				lastname: $lastname
			}
		) {
			userId
			token
			tokenExpiration
		}
	}
`;

const UserSignUpForm = () => {
	const { login } = useContext(AuthContext);
	let navigate = useNavigate();
	let location = useLocation();
	let from = location.state?.from?.pathname || '/';

	const [signUpUser, { error, data }] = useMutation(SIGNUP_MUTATION, {
		onCompleted: ({ signUpUser }) => {
			setUserData({
				token: signUpUser.token,
				userId: signUpUser.userId,
				tokenExpiration: signUpUser.tokenExpiration,
			});
			login(signUpUser.token, signUpUser.userId, signUpUser.tokenExpiration);
			localStorage.setItem('Token', JSON.stringify(signUpUser.token));
			setFormData(
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

	const signUpUserHandler = (e) => {
		e.preventDefault();

		try {
			signUpUser({
				variables: {
					username: formState.inputs.username.value,
					email: formState.inputs.email.value,
					password: formState.inputs.password.value,
					firstname: formState.inputs.firstname.value,
					middlename: formState.inputs.middlename.value,
					lastname: formState.inputs.lastname.value,
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
						Sign Up
					</Typography>
					{data ? (
						<Typography component="h6" variant="h6" color="secondary">
							{data ? 'Sign up successful!' : '\u00A0'}
						</Typography>
					) : (
						<Typography component="h6" variant="h6" color="secondary">
							{error
								? error.message === 'Username exists already.' ||
								  error.message === 'Email already taken.'
									? error.message
									: 'Something went wrong, please try again.'
								: '\u00A0'}
						</Typography>
					)}

					<Box component="form" onSubmit={signUpUserHandler} sx={{ mt: 5 }}>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={5}>
								<Grid item xs={6}>
									<Typography component="h6" variant="h6">
										Account Information
									</Typography>
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
									<Input
										type="text"
										id="email"
										label="Email"
										placeholder="Enter your email here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_EMAIL()]}
									/>
								</Grid>
								<Grid item xs={6}>
									<Typography component="h6" variant="h6">
										Personal Details
									</Typography>
									<Input
										type="text"
										id="firstname"
										label="Firstname"
										placeholder="Enter your first name here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_REQUIRE()]}
									/>
									<Input
										type="text"
										id="middlename"
										label="Middlename"
										placeholder="Enter your middle name here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_REQUIRE()]}
									/>
									<Input
										type="text"
										id="lastname"
										label="Lastname"
										placeholder="Enter your last name here!"
										fullWidth
										margin="normal"
										size="small"
										onInput={inputHandler}
										validators={[VALIDATOR_REQUIRE()]}
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
												onClick={signUpUserHandler}>
												Sign Up
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
