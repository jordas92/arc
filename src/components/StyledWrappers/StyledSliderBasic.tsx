/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Slider } from '@mui/material';

import { sizeKeys } from 'constants/default';

type CustomProps = {
	sliderSize?: keyof typeof sizeKeys;
	shiny?: boolean;
	styles?: Object; // The back door
};

const { M, L, S } = sizeKeys;

// TODO_NEXT  - move to utils and use within StyledSlider... Components
const sliderSizes = (sliderSize: keyof typeof sizeKeys | undefined) => {
	const defaultSizes = {
		thumb: '14px',
		trackAndRail: '4px',
	};

	if (sliderSize) {
		switch (sliderSize) {
			case L:
				return {
					thumb: '20px',
					trackAndRail: '10px',
				};

			case M:
				return {
					thumb: '16px',
					trackAndRail: '6px',
				};

			case S:
				return {
					thumb: '12px',
					trackAndRail: '2px',
				};

			default:
				return defaultSizes;
		}
	}

	return defaultSizes;
};

const StyledSliderBasic = styled(Slider, {
	shouldForwardProp: (prop: string) => !['sliderSize', 'shiny', 'styles'].includes(prop),
})<CustomProps>(({ theme, sliderSize, shiny, styles }) => ({
	'&.MuiSlider-root': {
		padding: '16px 0',
	},

	'.MuiSlider-thumb': {
		height: sliderSizes(sliderSize).thumb,
		width: sliderSizes(sliderSize).thumb,
		backgroundColor: theme.palette.text.primary,
		border: 'none',

		// disable slider thumb ripple
		'&:hover, &.Mui-focusVisible, &.Mui-active': {
			boxShadow: 'none !important',
		},
	},

	'.MuiSlider-track': {
		height: sliderSizes(sliderSize).trackAndRail,
		border: 'none',
		background: shiny
			? 'linear-gradient(90deg, #5CCF94 0%, #5646D6 100%)'
			: theme.palette.primary.main,
	},

	'.MuiSlider-rail': {
		height: sliderSizes(sliderSize).trackAndRail,
		color: theme.palette.background.surfaceHighest,
	},

	'&.Mui-disabled': {
		opacity: 0.4,
	},

	...styles,
}));

export default StyledSliderBasic;
