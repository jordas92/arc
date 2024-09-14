/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { TextField } from '@mui/material';

const styles = {
	textField: {
		marginTop: 0,
		marginBottom: '16px',
		'& .MuiInputLabel-root': {
			fontStyle: 'normal',
			fontWeight: 400,
			fontSize: '12px',
			lineHeight: '24px',
			letterSpacing: '0.15px',
			color: 'text.active',
			'&.Mui-focused': {
				color: 'text.active',
				fontWeight: 400,
				fontSize: '12px',
			},
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: '2px',
			backgroundColor: 'background.surfaceHighest',
			borderColor: 'transparent',
			'&:hover fieldset': {
				borderColor: 'transparent',
			},
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			'&.Mui-focused fieldset': {
				borderColor: 'background.surfaceHighest',
				backgroundColor: 'transparent',
			},
			'&:hover fieldset': {
				borderColor: 'background.surfaceHighest',
			},
		},
	},
	filledTextField: {
		'& .MuiOutlinedInput-notchedOutline': {
			backgroundColor: 'transparent',
		},
	},
};

const CustomTextField = ({ field, form, ...props }) => {
	const { name } = field;
	const [filled] = useState(Boolean(form.values[name]));

	return (
		<TextField
			{...field}
			{...props}
			onBlur={form.handleBlur}
			sx={{
				...styles.textField,
				...(filled && styles.filledTextField),
			}}
			error={form.touched[name] && Boolean(form.errors[name])}
			helperText={form.touched[name] && form.errors[name]}
		/>
	);
};

export default CustomTextField;
