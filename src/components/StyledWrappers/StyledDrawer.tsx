/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Drawer } from '@mui/material';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
	'.MuiDrawer-paper': {
		width: '420px',
		padding: '16px',
		margin: '70px 10px',
		maxHeight: '90%',
		borderRadius: '8px',
		border: `1px solid ${theme.palette.background.surfaceHighest}`,
		backgroundColor: theme.palette.background.surfaceSolid,
		backgroundImage: 'none',
	},
}));

export default StyledDrawer;
