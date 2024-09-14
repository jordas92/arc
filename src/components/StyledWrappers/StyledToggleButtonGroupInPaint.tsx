/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroupInPaint = styled(ToggleButtonGroup)(({ theme }) => ({
	'.MuiButtonBase-root': {
		border: 'unset',
	},

	'.MuiToggleButtonGroup-middleButton.Mui-disabled': {
		border: 'unset',
	},

	'.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
		border: 'unset',
		borderRadius: '6px',
	},

	'.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
		border: 'unset',
		borderRadius: '6px',
	},
}));

export default StyledToggleButtonGroupInPaint;
