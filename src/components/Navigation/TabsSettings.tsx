/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Tooltip, ToggleButton } from '@mui/material';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import StyledToggleButtonGroup from 'components/StyledWrappers/StyledToggleButtonGroup';

interface TabData {
	name: string;
	value: number | string;
	label: string;
	icon?: any;
	disabled?: boolean;
	isVisible?: boolean;
	iconPosition?: string;
}

interface TabsSettingsProps {
	ariaLabel: string;
	data: TabData[];
	onChange: any;
	initialValue: number | string;
}

export function TabsSettings(props: TabsSettingsProps) {
	const { ariaLabel, data, onChange, initialValue } = props;
	const [value, setValue] = useState<number | string>(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const handleChange = (event: SyntheticEvent, newValueNumber: number | string) => {
		if (newValueNumber !== null && newValueNumber !== 4) {
			if (onChange) {
				setValue(newValueNumber);
				onChange(newValueNumber);
			}
		}
	};

	return (
		<StyledContainerTools sx={{ padding: '4px' }}>
			<StyledToggleButtonGroup
				value={value}
				onChange={handleChange}
				aria-label={ariaLabel}
				exclusive
				fullWidth
				allRounded
			>
				{data.map(
					(tab, index) =>
						tab.isVisible && (
							<Tooltip
								key={`${index}tooltip`}
								title={tab.label}
								placement="top"
								arrow
							>
								<ToggleButton key={index} value={tab.value} disabled={tab.disabled}>
									{tab.name}
								</ToggleButton>
							</Tooltip>
						),
				)}
			</StyledToggleButtonGroup>
		</StyledContainerTools>
	);
}
