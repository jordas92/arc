/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroupControlNetImages = styled(ToggleButtonGroup)(({ theme }) => ({
	'& .MuiToggleButton-root': {
		backgroundColor: 'transparent',
		borderBottom: `1px solid transparent`,
		borderRadius: '0px',
		fontSize: '12px',
		padding: '8px',
	},
	'.MuiToggleButtonGroup-grouped': {
		'&:hover': {
			backgroundColor: 'transparent',
		},
		'&.Mui-selected': {
			color: theme.palette.text.primary,
			backgroundColor: 'transparent',
			cursor: 'default',
			borderBottom: `1px solid ${theme.palette.primary.light}`,
			'&:hover': {
				backgroundColor: 'transparent',
			},
		},
		'&:not(:first-of-type)': {
			borderRadius: '0',
		},
		'&:not(:last-of-type)': {
			borderRadius: '0',
		},
	},
}));

export default StyledToggleButtonGroupControlNetImages;
