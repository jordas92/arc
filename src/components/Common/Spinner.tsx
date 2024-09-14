/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, CircularProgress } from '@mui/material';

type Props = {
	margin?: string;
	size?: number;
};

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	'.MuiCircularProgress-root': {
		color: theme.palette.primary.dark,
	},
}));

const Spinner: React.FC<Props> = ({ margin, size = 40 }) => {
	return (
		<StyledBox sx={{ margin: `${margin || '50px 0'}` }}>
			<CircularProgress size={size} />
		</StyledBox>
	);
};

export default Spinner;
