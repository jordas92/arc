/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { ToggleButtonGroup } from '@mui/material';

const StyledToggleButtonGroupControlNet = styled(ToggleButtonGroup)(({ theme }) => ({
	width: '40px',
	padding: '4px',
	borderRadius: '12px',
	backgroundColor: theme.palette.background.surfaceLowest,
	transform: 'translateY(250px)',
	flexDirection: 'column',

	'.MuiButtonBase-root': {
		width: '32px',
		height: '32px',
		padding: '4px',
		borderRadius: '10px',
		transition: '0.3s',

		svg: {
			height: '28px',
			width: '28px',
		},
	},

	'.MuiToggleButtonGroup-grouped': {
		marginBottom: '8px',
	},

	'.MuiToggleButtonGroup-grouped:last-of-type': {
		marginBottom: '0',
	},
}));

export default StyledToggleButtonGroupControlNet;
