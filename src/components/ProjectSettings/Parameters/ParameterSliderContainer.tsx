/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

import { sizeKeys } from 'constants/default';
import StyledSliderBasic from 'components/StyledWrappers/StyledSliderBasic';

const styles = {
	mainContainer: {
		width: '100%',
	},
	box: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '5px',
	},
	currentValue: {
		borderRadius: '8px',
		padding: '2px 8px',
		width: '40px',
		height: '24px',
		backgroundColor: 'background.surfaceLowest',
		lineHeight: 1.8,
	},
};

type Props = {
	label: string;
	ariaLabel: string;
	tooltip: string;
	defaultValue: number;
	value: number;
	min: number;
	max: number;
	step: number;
	currentValue: number;
	onChange: Function;
};

const { S } = sizeKeys;

const ParameterSliderContainer: React.FC<Props> = ({
	label,
	ariaLabel,
	tooltip,
	defaultValue,
	value,
	min,
	max,
	step,
	currentValue,
	onChange,
}) => {
	return (
		<Box sx={styles.mainContainer}>
			<Box sx={styles.box}>
				<Tooltip title={tooltip} placement="top" arrow>
					<Typography variant="h6" color="text.secondary" component="span">
						{label}
					</Typography>
				</Tooltip>
				<Typography
					variant="h6"
					color="text.active"
					component="span"
					sx={styles.currentValue}
				>
					{currentValue}
				</Typography>
			</Box>
			<Box sx={{ width: '87%', margin: '0 0 0 8px' }}>
				<StyledSliderBasic
					aria-label={ariaLabel}
					defaultValue={defaultValue}
					value={value}
					min={min}
					max={max}
					step={step}
					onChange={(_, value) => onChange(value as number)}
					sliderSize={S}
				/>
			</Box>
		</Box>
	);
};

export default ParameterSliderContainer;
