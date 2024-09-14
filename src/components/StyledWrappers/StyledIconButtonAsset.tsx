/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

type CustomProps = {
	hasBackground?: boolean;
	isFiledIcon?: boolean;
	boxSize?: string;
};

const StyledIconButtonAsset = styled(IconButton, {
	shouldForwardProp: (prop: string) =>
		!['hasBackground', 'isFiledIcon', 'boxSize'].includes(prop),
})<CustomProps>(({ theme, hasBackground, isFiledIcon, boxSize }) => ({
	margin: `${hasBackground ? '4px' : '0'}`,
	width: `${hasBackground ? boxSize || '40px' : boxSize || 'auto'}`,
	height: `${hasBackground ? boxSize || '40px' : boxSize || 'auto'}`,
	backgroundColor: `${hasBackground ? theme.palette.background.iconActive : 'unset'}`,
	transition: '0.3s', // THEME_NEXT

	svg: {
		path: {
			stroke: theme.palette.text.active,
			fill: `${isFiledIcon ? theme.palette.text.active : 'none'}`,
			transition: '0.3s',
		},
	},

	'&.Mui-disabled': {
		backgroundColor: `${hasBackground ? theme.palette.background.iconActive : 'unset'}`,
		path: {
			stroke: theme.palette.text.disabled,
			fill: `${isFiledIcon ? theme.palette.text.disabled : 'none'}`,
		},
	},

	'&:hover': {
		strokeWidth: '0.5',
		backgroundColor: `${hasBackground ? theme.palette.background.iconHover : 'unset'}`,

		svg: {
			path: {
				stroke: theme.palette.text.hover,
				fill: `${isFiledIcon ? theme.palette.text.hover : 'none'}`,
			},
		},
	},
}));

export default StyledIconButtonAsset;
