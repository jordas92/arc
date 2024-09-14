/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

type CustomProps = {
	hasBackground?: boolean;
	boxSize?: string;
	colorLow?: boolean;
};

const StyledIconButtonMui = styled(IconButton, {
	shouldForwardProp: (prop: string) => !['hasBackground', 'boxSize', 'colorLow'].includes(prop),
})<CustomProps>(({ theme, hasBackground, boxSize, colorLow }) => ({
	color: colorLow ? theme.palette.text.textLowest : theme.palette.text.active,
	margin: `${hasBackground ? '4px' : '0'}`,
	width: `${hasBackground ? boxSize || '40px' : 'auto'}`,
	height: `${hasBackground ? boxSize || '40px' : 'auto'}`,
	backgroundColor: `${hasBackground ? theme.palette.background.iconActive : 'unset'}`,
	transition: '0.3s', // THEME_NEXT

	'&.Mui-disabled': {
		color: theme.palette.text.disabled,
	},

	'&:hover': {
		color: theme.palette.text.hover,
		backgroundColor: `${hasBackground ? theme.palette.background.iconHover : 'unset'}`,
	},
}));

export default StyledIconButtonMui;
