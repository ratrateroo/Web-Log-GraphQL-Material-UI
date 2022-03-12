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
import User from './User';

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

const UsersList = () => {
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
				<Typography>Users List</Typography>
				<User />
			</Container>
		</Fragment>
	);
};

export default UsersList;
