/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Dialog } from '@mui/material';

type CustomProps = {
	height?: string;
	width?: string;
	overflowy?: string;
	isResponsive?: boolean;
};

const StyledDialogHorizontalCard = styled(Dialog, {
	shouldForwardProp: (prop: string) =>
		!['height, width, overflowy', 'isResponsive'].includes(prop),
})<CustomProps>(({ theme, height, width, overflowy, isResponsive }) => ({
	'.MuiDialog-paper': {
		display: 'flex',
		alignItems: 'center',
		width: `${width || '650px'}`,
		maxWidth: '90%',
		padding: '0',
		height: `${height || 'auto'}`,
		borderRadius: '8px',
		border: `1px solid ${theme.palette.background.surfaceHighest}`,
		backgroundColor: theme.palette.background.surfaceSolid,
		backgroundImage: 'none',
		overflowY: `${overflowy || 'inherit'}`,
		...(isResponsive && {
			[theme.breakpoints.down('sm')]: {
				width: '90%',
			},
			[theme.breakpoints.up(1024)]: {
				width: '800px',
			},
			[theme.breakpoints.up(1440)]: {
				width: '920px',
			},
			[theme.breakpoints.up(1920)]: {
				width: '1180px',
			},
		}),
	},
}));

export default StyledDialogHorizontalCard;
