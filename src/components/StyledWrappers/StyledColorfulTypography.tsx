/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const StyledColorfulTypography = styled(Typography)(({ theme }) => ({
	padding: '4px',
	borderRadius: '4px',
	color: theme.palette.text.primary,
	background: theme.palette.background.gradientColorful,

	'&:hover': {
		color: theme.palette.text.primary,
		background: theme.palette.background.gradientColorful,
	},
})) as typeof Typography;

export default StyledColorfulTypography;
