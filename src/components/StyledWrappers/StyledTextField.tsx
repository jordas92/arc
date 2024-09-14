/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { TextField } from '@mui/material';

type CustomProps = {
	maxLength?: number;
	padding?: string;
};

const StyledTextField = styled(TextField, {
	shouldForwardProp: (prop: string) => !['maxLength', 'padding'].includes(prop),
})<CustomProps>(({ maxLength, padding }) => ({
	maxLength: maxLength || 'unset',

	'& fieldset': {
		border: 'none',
	},
	'.MuiInputBase-root': {
		padding: `${padding || '0'}`,
	},
}));

export default StyledTextField;
