/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Select } from '@mui/material';

type CustomProps = {
	hasBorder?: boolean;
	styles?: Object;
};

const StyledSelect = styled(Select, {
	shouldForwardProp: (prop: string) => !['hasBorder', 'styles'].includes(prop),
})<CustomProps>(({ theme, hasBorder, styles }) => ({
	color: theme.palette.text.active,
	backgroundColor: theme.palette.background.surfaceLow,
	border: `${hasBorder ? `1px solid ${theme.palette.background.surfaceHighest}` : 'unset'}`,
	borderRadius: '8px',
	transition: '0.3s', // THEME_NEXT

	'.MuiSelect-select': {
		padding: '12px',
	},

	'&:hover': {
		color: theme.palette.text.hover,
	},

	'.MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},

	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: 'unset',
		border: 'unset',
	},

	...styles,
}));

export default StyledSelect;
