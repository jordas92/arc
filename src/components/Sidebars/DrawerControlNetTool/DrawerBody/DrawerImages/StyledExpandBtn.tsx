/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

type ButtonProps = {
	hasBackground?: boolean;
};

const StyledExpandBtn = styled(IconButton, {
	shouldForwardProp: (prop: string) => !['hasBackground'].includes(prop),
})<ButtonProps>(({ theme, hasBackground }) => ({
	height: '22px',
	padding: '8px 12px',
	borderRadius: '4px',
	backgroundColor: `${hasBackground ? theme.palette.background.surfaceLowest : 'unset'}`,
	transition: '0.3s',

	svg: {
		path: {
			stroke: theme.palette.text.active,
			transition: '0.3s',
		},
	},

	'&:hover': {
		backgroundColor: theme.palette.background.surfaceLowest,
		svg: {
			path: {
				stroke: theme.palette.text.hover,
			},
		},
	},
}));

export default StyledExpandBtn;
