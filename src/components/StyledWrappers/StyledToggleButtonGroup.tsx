/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type CustomProps = {
	allRounded?: boolean;
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup, {
	shouldForwardProp: (prop: string) => !['allRounded'].includes(prop),
})<CustomProps>(({ theme, allRounded }) => ({
	'.Mui-selected': {
		backgroundColor: theme.palette.background.surfaceHighest,
		color: theme.palette.text.hover,
		cursor: 'default',
	},
	'.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
		border: 'unset',
		borderRadius: `${allRounded ? '6px' : 'none'}`,
	},
	'.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
		border: 'unset',
		borderRadius: `${allRounded ? '6px' : 'none'}`,
	},
}));

export default StyledToggleButtonGroup;
