/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { List } from '@mui/material';

const StyledList = styled(List)(({ theme }) => ({
	display: 'flex',
	padding: 0,

	li: {
		padding: 0,
		textWrap: 'nowrap',
		marginRight: '5px',
		color: theme.palette.text.active,
		backgroundColor: 'unset',
		transition: '0.3s',

		svg: {
			width: '100%',
			path: {
				stroke: theme.palette.text.active,
			},
		},

		'.MuiListItemIcon-root': {
			display: 'block',
		},

		'.MuiButtonBase-root:hover': {
			color: theme.palette.text.hover,
			backgroundColor: 'transparent',

			svg: {
				path: {
					stroke: theme.palette.text.hover,
				},
			},
		},

		'.Mui-selected': {
			color: theme.palette.text.hover,
			borderRadius: '8px',
			backgroundColor: theme.palette.background.surfaceLow,

			svg: {
				path: {
					stroke: theme.palette.text.hover,
				},
			},

			'&:hover': {
				backgroundColor: theme.palette.background.surfaceLow,
				cursor: 'default',
			},
		},
	},
}));

export default StyledList;
