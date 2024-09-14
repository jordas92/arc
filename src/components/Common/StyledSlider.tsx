import React, { FC, useState } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { Grid, IconButton, Slider as MuiSlider, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';

const StyledSlider = styled(MuiSlider)(({ theme }) => ({
	// THEME
	color: theme.palette.primary.main,
	'.MuiSlider-rail': {
		height: '16px',
		borderRadius: '16px',
		background: 'linear-gradient(90deg, #5CCF94 0%, #5646D6 51.26%, #E20000 113.42%)',
	},
	'.MuiSlider-track': {
		height: '16px',
		borderRadius: '16px',
		background: 'transparent',
		border: 'none',
	},
	'.MuiSlider-thumb': {
		width: '24px',
		height: '24px',
		background: 'white',
		borderRadius: '50%',
		// transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		// '&:hover, &.Mui-focusVisible': {
		// 	transform: 'scale(1.2)',
		// },
	},
}));

interface CustomSliderProps {
	title: string;
	value: number;
	onChange?: (value: number) => void;
	min: number;
	max: number;
	step: number;
	defaultValue: number;
	marks: any[];
	sx?: any;
	extended?: boolean;
}

const Slider: FC<CustomSliderProps> = ({
	title,
	value,
	defaultValue,
	extended = false,
	onChange,
	min,
	max,
	step,
	marks,
	sx,
}) => {
	const [currentValue, setCurrentValue] = useState(value || 0.5);

	const onValueChange = (event: any) => {
		let newValue = parseFloat(event.target.value);
		if (max <= 1) {
			if (newValue > 1.0) {
				newValue = 1.0;
			} else if (newValue < 0) {
				newValue = 0;
			}
		} else if (newValue > max) {
			newValue = max;
		} else if (newValue <= min) {
			newValue = min;
		}
		// const newRealValue = parseFloat(newValue.toString()) / 100;
		setCurrentValue(newValue);
		if (onChange && typeof onChange === 'function') {
			// @ts-ignore
			onChange(newValue);
		}
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			sx={{ width: '100%', margin: '0 auto' }}
		>
			{extended && (
				<Grid item xs={2} textAlign="center" alignContent="center" alignSelf="center">
					<Typography
						variant="h6"
						component="h6"
						color="textSecondary"
						fontWeight="400"
						sx={{
							paddingRight: '12px',
						}}
					>
						{title}
					</Typography>
				</Grid>
			)}
			{extended && (
				<Grid item xs={1} textAlign="left" alignContent="center" alignSelf="center">
					<IconButton>
						<Tooltip title={title} key="slider_icon_button" arrow>
							<InfoOutlined />
						</Tooltip>
					</IconButton>
				</Grid>
			)}
			<Grid
				item
				xs={extended ? 5 : 12}
				alignSelf="center"
				style={{
					marginTop: '10px',
				}}
			>
				<StyledSlider
					sx={sx}
					value={currentValue}
					defaultValue={defaultValue}
					step={step}
					min={min}
					max={max}
					marks={marks}
					valueLabelDisplay="auto"
					onChange={onValueChange}
				/>
			</Grid>

			{extended && (
				<Grid item xs={2} textAlign="right" alignSelf="center">
					<TextField
						variant="outlined"
						size="small"
						onChange={(e: any) => onValueChange(e)}
						value={currentValue}
						sx={{
							maxWidth: '60px',
						}}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default Slider;
