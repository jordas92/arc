import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	MenuItem,
	Select as MuiSelect,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { ChangeEvent, useEffect, useState } from 'react';

const StyledSelect = styled(MuiSelect)({
	width: '100%',
	fontSize: '12px',
	marginBottom: '12px',
	'& .MuiSelect-select': {
		backgroundColor: '#464178',
		borderRadius: '7px',
		'&:hover': {
			color: 'rgba(255, 255, 255, 0.7)',
			border: 'none',
		},
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: 'rgba(255, 255, 255, 1)',
		borderWidth: '1px',
	},
});

const StyledFormControl = styled(FormControl)({
	width: '100%',
	position: 'relative',
	paddingTop: '24px',
});

const StyledFormControlLabel = styled(FormControlLabel)({
	margin: 0,
	'& .MuiCheckbox-root': {
		padding: 0,
	},
});

const MenuProps = {
	PaperProps: {
		style: {
			radius: '4px',
			padding: '12px 0px 12px 0px',
			gap: '12px',
			width: '248px',
			height: 'auto',
			maxHeight: '260px',
			background:
				'linear-gradient(0deg, rgba(70, 65, 120, 0.56) 0%, rgba(70, 65, 120, 0.56) 100%), #0F0E1A',
		},
	},
};

const CheckboxContainer = styled('div')({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

interface SelectProps {
	label: string;
	type?: string | undefined;
	options?: any[];
	value?: string[];
	defaultValue?: any;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DropdownWithCheckbox: React.FC<SelectProps> = ({
	label,
	options,
	onChange,
	type,
	value,
	defaultValue,
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	useEffect(() => {
		if (selectedOptions.length === 0 && defaultValue) {
			handleOptionChange({ target: { value: [defaultValue.key] } } as any);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOptions]);

	const returnRenderValue = () => {
		let renderValue = '0 Selected models';
		if (selectedOptions.length > 0 && options && options?.length > 0) {
			const firstSelectedModel = options.filter(
				(option) => option.key === selectedOptions[0],
			);
			if (firstSelectedModel.length > 0) {
				renderValue = firstSelectedModel[0].value;
				if (selectedOptions.length - 1 > 0) {
					renderValue += ` (+${selectedOptions.length - 1})`;
				}
			}
		}
		return renderValue;
	};

	const modelItem = (item: any) => {
		if (item && item.key) {
			return (
				<MenuItem key={item.sha256 || item.key} value={item.key}>
					<CheckboxContainer>
						<Box sx={{ fontSize: '12px' }}>{item.value}</Box>
						<StyledFormControlLabel
							control={
								<Checkbox
									checked={selectedOptions.includes(item.key)}
									onChange={() => handleCheckboxChange(item.key)}
								/>
							}
							label=""
						/>
					</CheckboxContainer>
				</MenuItem>
			);
		}
	};

	const genericItem = (item: any) => {
		if (item && item.name && item.value) {
			return (
				<MenuItem key={item.name} value={item.value}>
					<CheckboxContainer>
						<Box sx={{ fontSize: '12px' }}>{item.name}</Box>
						<FormControlLabel
							control={
								<Checkbox
									checked={selectedOptions.includes(item.value)}
									onChange={() => handleCheckboxChange(item.value)}
								/>
							}
							label=""
						/>
					</CheckboxContainer>
				</MenuItem>
			);
		}
	};

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement> | any) => {
		setSelectedOptions(event.target.value as string[]);
		if (onChange) onChange(event);
	};

	const handleCheckboxChange = (value: string) => {
		const updatedOptions = selectedOptions.includes(value)
			? selectedOptions.filter((option) => option !== value)
			: [...selectedOptions, value];
		setSelectedOptions(updatedOptions);
	};

	return (
		<StyledFormControl>
			<StyledSelect
				value={selectedOptions}
				renderValue={() => returnRenderValue()}
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

export default DropdownWithCheckbox;
