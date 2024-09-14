/**
 *  Copyright (c) 2023-present ORBIS DS authors.
 */

import React, { memo, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MuiSelect } from '@mui/material';
import { styled } from '@mui/system';

type CustomProps = {
	hasBackground?: boolean;
};

const StyledSelect = styled(MuiSelect)<CustomProps>(({ theme, hasBackground }) => ({
	width: '100%',
	color: theme.palette.text.active,
	backgroundColor: hasBackground ? theme.palette.background.surfaceLow : '',
	borderRadius: '8px',
	transition: '0.3s', // THEME_NEXT

	'&:hover': {
		// THEME
		color: 'rgba(255, 255, 255, 0.3)',
	},
	'& .MuiSelect-select': {
		padding: '12px',
		borderRadius: '8px',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		// THEME
		borderColor: 'rgba(255, 255, 255, 1)',
		borderWidth: '1px',
	},
}));

const StyledInputLabel = styled(InputLabel)({
	left: '-12px',
	top: '-40px',
	'&.Mui-focused': {
		// THEME
		color: 'rgba(255, 255, 255, 0.7)',
	},
});

const StyledInputLabelSecond = styled(InputLabel)({
	'&.Mui-focused': {
		// THEME
		color: 'rgba(255, 255, 255, 0.7)',
	},
});

const StyledFormControl = styled(FormControl)({
	width: '100%',
	position: 'relative',
});

interface Props {
	id: string;
	isObjToReturn?: boolean;
	name?: string;
	label?: string;
	value?: Object;
	options: Array<any>;
	onChange: (e: React.ChangeEvent<HTMLInputElement> | []) => void;
	MenuPropsStyle?: Object;
	isLabelInput?: boolean;
	disabled?: boolean;
	hasBackground?: boolean;
	style?: Object;
	uuid?: string;
	variant?: string;
	htmlFor?: string;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: () => void;
	IconComponent?: () => any;
}

const StyledDropDown = memo((props: Props) => {
	const {
		id,
		name,
		label,
		value,
		options,
		isObjToReturn,
		onChange,
		MenuPropsStyle,
		isLabelInput,
		disabled,
		onFocus,
		onBlur,
		IconComponent,
		hasBackground,
	} = props;

	const [localValue, setLocalValue] = useState(value ?? '');
	useEffect(() => setLocalValue(value ?? ''), [value]);

	const handleFocus = () => {
		if (onFocus) {
			onFocus();
		}
	};

	const handleChange = (e: any) => {
		if (onChange && isObjToReturn === true) {
			const filterArray: any[] = options.filter((item) => item.name === e.target.value);
			setLocalValue(filterArray[0].name);
			onChange(filterArray[0]);
		} else {
			setLocalValue(e.target.value);
			e.target.uuid = props.uuid;
			onChange(e);
		}
	};

	const handleBlur = (e: any) => {
		if (onBlur) {
			onBlur(e.target.value);
		}
	};

	function renderValue(rV) {
		let rValue = rV;

		const option = options.find((item) => item.key === localValue);

		if (option) {
			rValue = option.name;
		}

		return rValue;
	}

	return (
		<StyledFormControl>
			{isLabelInput ? (
				<StyledInputLabelSecond id={`selectID_${label}`}>{label}</StyledInputLabelSecond>
			) : (
				<StyledInputLabel shrink={false} id={`selectID_${label}`}>
					{label}
				</StyledInputLabel>
			)}

			<StyledSelect
				id={id}
				labelId={`selectID_${label}`}
				label={label}
				name={name}
				value={localValue.toString() || ''}
				onFocus={handleFocus}
				onBlur={handleBlur}
				renderValue={renderValue}
				autoWidth
				disabled={disabled || false}
				onChange={(e: any) => handleChange(e)}
				data-tid={id}
				MenuProps={MenuPropsStyle}
				IconComponent={IconComponent}
				hasBackground={hasBackground}
			>
				{options &&
					options.map((option, index) => (
						<MenuItem
							key={`${index}_${option.value}`}
							value={option.name}
							disabled={option.disabled}
						>
							{option.name}
						</MenuItem>
					))}
			</StyledSelect>
		</StyledFormControl>
	);
});

export default StyledDropDown;
