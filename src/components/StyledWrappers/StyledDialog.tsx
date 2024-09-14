/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Dialog } from '@mui/material';

type CustomProps = {
	height?: string;
	width?: string;
	padding?: string;
	isHidden?: boolean;
};

const StyledDialog = styled(Dialog, {
	shouldForwardProp: (prop: string) => !['height', 'width', 'padding', 'isHidden'].includes(prop),
})<CustomProps>(({ theme, height, width, padding, isHidden }) => ({
	'&.MuiModal-root': {
		zIndex: isHidden ? '-1' : '10',
		display: isHidden ? 'none' : 'initial',
	},

	'.MuiDialog-paper': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: `${width || '650px'}`,
		maxWidth: 'unset',
		padding: `${padding || '16px'}`,
		margin: '70px 10px',
		height: `${height || '650px'}`,
		borderRadius: '8px',
		border: `1px solid ${theme.palette.background.surfaceHighest}`,
		backgroundColor: theme.palette.background.surfaceSolid,
		backgroundImage: 'none',
	},
}));

export default StyledDialog;
