/**
 *  Copyright (c) 2023-present ORBIS DS authors.
 */

import React, { ChangeEvent, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import { styled } from '@mui/system';

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
	width: '100%',
	marginBottom: '20px',
	'&:hover': {
		color: 'rgba(255, 255, 255, 0.3)',
	},
	'& .MuiSelect-select': {
		backgroundColor: '#464178',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: 'rgba(255, 255, 255, 1)',
		borderWidth: '1px',
	},
}));

const StyledInputLabel = styled(InputLabel)({
	left: '-12px',
	textTransform: 'uppercase',
	'&.Mui-focused': {
		color: 'rgba(255, 255, 255, 0.7)',
	},
});

const StyledFormControl = styled(FormControl)({
	width: '100%',
	position: 'relative',
	paddingTop: '40px',
});

interface SelectProps {
	label: string;
	type?: string | undefined;
	options?: any[];
	value?: string;
	defaultValue?: any;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, onChange, type, value, defaultValue }) => {
	const [valueOption, setValueOption] = useState<string>(value || defaultValue || '');

	const item = (item: string) => (
		<MenuItem key={item} value={item}>
			{item}
		</MenuItem>
	);

	const modelItem = (item: any) => {
		if (item && item.hash) {
			return (
				<MenuItem key={item.sha256} value={item.hash}>
					{item.model_name}
				</MenuItem>
			);
		}
	};

	const genericItem = (item: any) => {
		if (item && item.name && item.value) {
			return (
				<MenuItem key={item.name} value={item.value}>
					{item.name}
				</MenuItem>
			);
		}
	};

	const changeEvent = (event: ChangeEvent<HTMLInputElement> | any) => {
		setValueOption(event.target.value as string);
		if (onChange) onChange(event);
	};

	return (
		<StyledFormControl>
			<StyledInputLabel shrink={false}>{label}</StyledInputLabel>
			<StyledSelect onChange={(e) => changeEvent(e)} value={valueOption || ''}>
				{/* <MenuItem value={''}>Select</MenuItem> */}
				{type === 'models' && options && options.map((option) => modelItem(option))}
				{type === 'generic' && options && options.map((option) => genericItem(option))}
				{!type && options && options.map((option) => item(option))}
			</StyledSelect>
		</StyledFormControl>
	);
};

export default Select;
