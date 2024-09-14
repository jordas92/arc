/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

import { APP_HEADER_HEIGHT } from 'constants/default';

const StyledHeaderWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: APP_HEADER_HEIGHT,
	borderBottom: `1px solid ${theme.palette.background.surfaceHighest}`,
	padding: '0 16px',
}));

export default StyledHeaderWrapper;
