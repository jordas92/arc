/**
 * Copyright (c) 2023-present ARCANA Authors.
 */

import MuiDialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';

// THEME_NEXT
// Custom styled dialog
export const StyledDialog = styled(MuiDialog)(({ theme }) => ({
	'.MuiPaper-root': {
		borderRadius: '8px',
		border: '1px solid',
		borderColor: theme.palette.background.surfaceHighest,
		backgroundColor: theme.palette.background.surfaceSolid,
		backgroundImage: 'none',
		boxShadow: 'none',
		padding: '16px',
	},

	'.MuiDialogTitle-root': {
		backgroundColor: theme.palette.background.surfaceSolid,
	},

	'.MuiDialogContent-root': {
		backgroundColor: theme.palette.background.surfaceSolid,
	},

	'.MuiDialogActions-root': {
		backgroundColor: theme.palette.background.surfaceSolid,
	},
}));

export const StyledDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
	margin: 0,
	textAlign: 'left',
}));

export const StyledDialogContent = styled(MuiDialogContent)(({ theme }) => ({
	textAlign: 'center',
	alignItems: 'center',
	alignContent: 'center',
}));

export const StyledDialogActions = styled(MuiDialogActions)(({ theme }) => ({
	margin: 0,
	padding: 10,
}));

// export const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
