import React, { Fragment, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useForm } from '../../hooks/useForm/index';

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

const SignUpUser = () => {
	const [signUpUser, { error }] = useMutation(SIGNUP_MUTATION);
	const [user, setUser] = useState({
		username: '',
		password: '',
	});

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
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<Box
						component="form"
						noValidate
						// onSubmit={signUpUserHandler}
						sx={{ mt: 1 }}>
						<TextField
							autoComplete="false"
							name="username"
							margin="normal"
							fullWidth
							id="username"
							label="Username"
							// onChange={usernameChangeHandler}
							value={user.username}
							type="text"
						/>
						<TextField
							autoComplete="false"
							name="password"
							margin="normal"
							fullWidth
							id="password"
							label="Password"
							// onChange={usernameChangeHandler}
							value={user.password}
							type="password"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							size="large">
							Sign Up
						</Button>
					</Box>
				</Box>
			</Container>
		</Fragment>
	);
};

export default SignUpUser;
