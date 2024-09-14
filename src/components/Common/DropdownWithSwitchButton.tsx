import React, { ChangeEvent, useState } from 'react';
import {
	Box,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
	Switch,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledSelect = styled(MuiSelect)({
	width: '100%',
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: 'rgba(255, 255, 255, 0.23)',
		borderWidth: '1px',
	},
});

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

const MenuProps = {
	PaperProps: {
		style: {
			radius: '4px',
			padding: '12px 0px 12px 0px',
			gap: '12px',
			width: '260px',
		},
	},
};

interface SelectProps {
	label: string;
	type?: string | undefined;
	options?: any[];
	value?: string;
	defaultValue?: any;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DropdownWithSwitchButton: React.FC<SelectProps> = ({
	label,
	options,
	onChange,
	type,
	value,
	defaultValue,
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>(
		defaultValue && defaultValue.hash ? [defaultValue.hash] : [],
	);

	const modelItem = (item: any) => {
		if (item && item.hash) {
			return (
				<MenuItem key={item.sha256} value={item.hash}>
					<FormControlLabel
						control={
							<Switch
								checked={selectedOptions.includes(item.hash)}
								onChange={() => handleSwitchChange(item.hash)}
							/>
						}
						label={<Box sx={{ fontSize: '12px' }}>{item.model_name}</Box>}
					/>
				</MenuItem>
			);
		}
	};

	const genericItem = (item: any) => {
		if (item && item.name && item.value) {
			return (
				<MenuItem key={item.name} value={item.value}>
					<FormControlLabel
						control={
							<Switch
								checked={selectedOptions.includes(item.value)}
								onChange={() => handleSwitchChange(item.value)}
							/>
						}
						label={<Box sx={{ fontSize: '12px' }}>{item.name}</Box>}
					/>
				</MenuItem>
			);
		}
	};

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement> | any) => {
		setSelectedOptions(event.target.value as string[]);
		if (onChange) onChange(event);
	};

	const handleSwitchChange = (value: string) => {
		const updatedOptions = selectedOptions.includes(value)
			? selectedOptions.filter((option) => option !== value)
			: [...selectedOptions, value];
		setSelectedOptions(updatedOptions);
	};

	return (
		<StyledFormControl>
			<StyledInputLabel shrink={false}>{label}</StyledInputLabel>
			<StyledSelect
				value={selectedOptions}
				renderValue={(selected) => `${(selected as string[]).length} Selected model(s)`}
				onChange={handleOptionChange}
				MenuProps={MenuProps}
				multiple
			>
				{type === 'models' && options && options.map((option) => modelItem(option))}
				{type === 'generic' && options && options.map((option) => genericItem(option))}
			</StyledSelect>
		</StyledFormControl>
	);
};

export default DropdownWithSwitchButton;
