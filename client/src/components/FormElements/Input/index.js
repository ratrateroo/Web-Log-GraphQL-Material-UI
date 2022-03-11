import React, { useReducer, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { validate } from '../../../services/validators/index';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || '',
		isTouched: false,
		isValid: props.initialValid || false,
	});

	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = (event) => {
		dispatch({
			type: 'CHANGE',
			val: event.target.value,
			validators: props.validators,
		});
	};

	const touchHandler = () => {
		dispatch({
			type: 'TOUCH',
		});
	};

	const inputElement =
		props.multiline === true ? (
			<TextField
				multiline
				minRows={10}
				maxRows={15}
				rows={props.rows}
				id={props.id}
				label={props.label}
				placeholder={props.placeholder}
				fullWidth={props.fullWidth}
				required={props.required}
				margin={props.margin}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<TextField
				type={props.type}
				id={props.id}
				label={props.label}
				placeholder={props.placeholder}
				fullWidth={props.fullWidth}
				required={props.required}
				margin={props.margin}
				size={props.size}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
				error={!inputState.isValid && inputState.isTouched}
			/>
		);

	return inputElement;
};

export default Input;
