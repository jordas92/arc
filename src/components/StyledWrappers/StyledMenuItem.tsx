/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { MenuItem } from '@mui/material';

type CustomProps = {
	margin?: number;
	padding?: string;
};

const StyledMenuItem = styled(MenuItem, {
	shouldForwardProp: (prop: string) => !['margin', 'padding'].includes(prop),
})<CustomProps>(({ theme, margin, padding }) => ({
	margin: `${margin || '8px 0'}`,
	padding: `${padding || '10px 12px'}`,
	color: theme.palette.text.active,

	'&:hover': {
		color: theme.palette.text.hover,
		backgroundColor: 'unset',
	},
}));

export default StyledMenuItem;
