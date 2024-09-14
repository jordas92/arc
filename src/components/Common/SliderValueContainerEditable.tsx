/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';
import { TextField, useTheme } from '@mui/material';

type Props = {
	value: number;
	onChange: Function;
	min: number;
	max: number;
	step?: number;
	isDisabled?: boolean;
	width?: string;
};

const SliderValueContainerEditable: React.FC<Props> = ({
	value,
	onChange,
	min,
	max,
	step = 1,
	isDisabled,
	width = '90px',
}) => {
	const theme = useTheme();
	const [containerValue, setContainerValue] = useState<string>(`${value}`);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		setContainerValue(`${value}`);
		setError('');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValueString = event.target.value;
		console.log(inputValueString);

		// https://mui.com/material-ui/react-text-field/#type-quot-number-quot
		if (inputValueString.includes('.')) {
			inputValueString.replace('.', '');
			return;
		}

		if (inputValueString.startsWith('0')) {
			return;
		}

		if (inputValueString === '') {
			setError('only numbers');
			setContainerValue('');
			return;
		}

		setContainerValue(inputValueString);

		const inputValueNumber = Number(event.target.value);

		if (inputValueNumber < min) {
			setError(`min ${min}`);
		}

		if (inputValueNumber > max) {
			setError(`max ${max}`);
		}

		if (inputValueNumber >= min && inputValueNumber <= max) {
			setError('');

			if (value < inputValueNumber) {
				onChange(Math.ceil(inputValueNumber / step) * step);
			} else {
				onChange(Math.round(inputValueNumber / step) * step);
			}
		}
	};

	const handleOnBlur = () => {
		if (!containerValue || Number(containerValue) < min) {
			setError('');
			setContainerValue(`${min}`);
			onChange(min);
		}

		if (Number(containerValue) > max) {
			setError('');
			setContainerValue(`${max}`);
			onChange(max);
		}
	};

	return (
		<TextField
			value={containerValue}
			error={!!error}
			size="small"
			label={error}
			variant="outlined"
			onChange={handleOnChange}
			disabled={isDisabled}
			inputProps={{
				inputMode: 'numeric',
				pattern: '[0-9]*',
				min,
				max,
				step,
				type: 'number',
				onBlur: () => handleOnBlur(),
			}}
			sx={{
				backgroundColor: theme.palette.background.surfaceHigh,
				borderRadius: '8px',
				width,
				'& fieldset': {
					border: 'none',
				},
				'.MuiInputLabel-root': {
					top: '-8px',
					left: '-12px',
					fontSize: '16px',
					maxWidth: '150px',
					textAlign: 'right',
				},
			}}
		/>
	);
};

export default SliderValueContainerEditable;
