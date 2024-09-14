/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type CustomProps = {
	allRounded?: boolean;
};

const StyledControlsToggleButtonGroup = styled(ToggleButtonGroup, {
	shouldForwardProp: (prop: string) => !['allRounded'].includes(prop),
})<CustomProps>(({ theme, allRounded }) => ({
	'& .MuiToggleButton-root': {
		backgroundColor: theme.palette.background.surfaceLow,
		borderBottom: `2px solid ${theme.palette.background.surfaceLow}`,
		borderBottomRightRadius: '0px',
		borderBottomLeftRadius: '0px',
	},
	'.Mui-selected': {
		backgroundColor: theme.palette.background.surfaceHighest,
		color: theme.palette.text.hover,
		cursor: 'default',
		borderBottom: `2px solid ${theme.palette.primary.light}`,
	},
}));

export default StyledControlsToggleButtonGroup;
