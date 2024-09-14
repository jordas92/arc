/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { ToggleButtonGroup } from '@mui/material';

type CustomProps = {
	// TODO_NEXT
	hasBackground?: boolean;
	isFiledIcon?: boolean;
};

const StyledToggleButtonIconGroup = styled(ToggleButtonGroup, {
	shouldForwardProp: (prop: string) => !['hasBackground', 'isFiledIcon'].includes(prop),
})<CustomProps>(({ theme, hasBackground, isFiledIcon }) => ({
	border: 'unset',
	borderRadius: '50%',
	transition: '0.3s', // THEME_NEXT
	backgroundColor: 'unset',
	svg: {
		width: '30px',
		height: '30px',
		padding: '4px',
		scale: '1.3',
		path: {
			stroke: theme.palette.text.active,
			strokeWidth: '2',
		},
	},

	'.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
		border: 'unset',
		borderRadius: '50%',
	},

	'.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
		border: 'unset',
		borderRadius: '50%',
	},

	'&:hover': {
		backgroundColor: 'unset',
		transition: '0.3s',
		svg: {
			path: {
				stroke: theme.palette.text.hover,
				strokeWidth: '2.5',
				transition: '0.3s',
			},
		},
	},

	'.MuiToggleButton-root.Mui-selected': {
		backgroundColor: theme.palette.accent.primary,
		cursor: 'default',

		svg: {
			path: {
				stroke: theme.palette.text.hover,
				strokeWidth: '2.5',
			},
		},

		'&:hover': {
			backgroundColor: theme.palette.accent.primary,
			transition: '0.3s',
			svg: {
				path: {
					stroke: theme.palette.text.hover,
					transition: '0.3s',
				},
			},
		},
	},
}));

export default StyledToggleButtonIconGroup;
