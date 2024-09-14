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
			color: 'rgba(255, 255, 255, 0.6)',
			'&.Mui-focused': {
				color: 'rgba(255, 255, 255, 0.6)',
				fontWeight: 400,
				fontSize: '12px',
			},
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: '2px',
			backgroundColor: '#46417866',
			borderColor: 'transparent',
			'&:hover fieldset': {
				borderColor: 'transparent',
			},
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			'&.Mui-focused fieldset': {
				borderColor: '#46417866',
				backgroundColor: 'transparent',
			},
			'&:hover fieldset': {
				borderColor: '#46417866',
			},
		},
	},
	filledTextField: {
		'& .MuiOutlinedInput-notchedOutline': {
			backgroundColor: 'transparent',
		},
	},
	textareaField: {
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset ': {
				borderColor: '#46417866',
				backgroundColor: 'transparent',
			},
			'&:hover fieldset': {
				borderColor: '#46417866',
			},
		},
	},
};

const CustomTextareaField = ({ field, form, ...props }) => {
	const { name } = field;
	const [filled, setFilled] = useState(Boolean(form.values[name]));

	const handleTextFieldChange = (e) => {
		form.handleChange(e);
		setFilled(Boolean(e.target.value));
	};

	return (
		<TextField
			{...field}
			{...props}
			value={form.values[name]}
			onChange={handleTextFieldChange}
			onBlur={form.handleBlur}
			sx={{
				...styles.textField,
				...styles.textareaField,
				...(filled && styles.filledTextField),
			}}
			multiline
			rows={12}
			error={form.touched[name] && Boolean(form.errors[name])}
			helperText={form.touched[name] && form.errors[name]}
		/>
	);
};

export default CustomTextareaField;
